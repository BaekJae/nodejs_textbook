const{
    Worker, isMainThread, parentPort,workerData
} = require('worker_threads');

if (isMainThread) { //부모일 때
    const threads = new Set();
    threads.add(new Worker(__filename, {
        workerData: { start: 1},
    }));
    //new Worker를 호출할 때 두 번째 인수의 workerData속성으로 원하는 데이터를 보낼 수 있다.
    threads.add(new Worker(__filename, {
        workerData: { start: 2},
    }));
    for (let worker of threads) {
        worker.on('message', message => console.log('from worker', message));
        worker.on('exit', () => {
            threads.delete(worker);
            //워커가 종료되면 해당 워커를 threads에서 제거
            if (threads.size === 0) {
                //모든 워커가 종료되면 job done이 로깅됨
               console.log('job done');
            }
        });
    }
} else { //워커일 때
    const data  = workerData;
    //워커에서는 workerData로 부모로부터 데이터를 받는다.
    parentPort.postMessage(data.start + 100);
    //부모로부터 숫자를 받아 100을 더해 돌려준다.
    //돌려주는 순간 워커가 종료되어 worker.on('exit')실행
}
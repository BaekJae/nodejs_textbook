const{
    Worker, isMainThread, parentPort,
} = require('worker_threads');
//다수의 함수를 worker_threads에서 가져온다.

if (isMainThread) { //부모일 때
    const worker = new Worker(__filename);
    worker.on('message', message => console.log('from worker', message));
    worker.on('exit', () => console.log('worker exit'));
    worker.postMessage('ping');
} else{ //워커일 때
    parentPort.on('message', (value) => {
        console.log('from parent', value);
        parentPort.postMessage('pong');
        parentPort.close();
    });
}
//isMainThread를 통해 현재 코드가 메인 스레드(기존에 동작하던 싱글 스레드)에서 실행되는지 아니면 생성한 워커 스레드에서 실행되는지 구분
//메인 스레드 -> new Worker를 통해 현재 파일(__filename)을 워커 스레드에서 실행
//부모에서는 워커 생성 후 worker.postMessage로 워커에 데이터를 보낼 수 있다.
//워커는 parentPort.on('message')이벤트 리스너로 부모로부터 메시지를 받고, parentPort.postMessage로 부모에게 메시지를 보낸다.
//메시지를 한 번만 받고 싶다면 once('message')
//parentPort.close()를 하면 부모와의 연결이 종료된다. 종료될 때는 worker.on('exit')가 실행된다.
//워커에서 on 메서드를 사용하면 직접 워커를 종료해야 한다.
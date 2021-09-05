const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length; //CPU개수

if(cluster.isMaster){
    console.log(`마스터 프로세스 아이디: ${process.pid}`);
    //cpu개수만큼 워커 생산
    for(let i=0; i<numCPUs; i++){
        cluster.fork();
    }
    //워커 종료시
    cluster.on('exit', (worker, code, signal) => {
        console.log(`${worker.process.pid}번 워커가 종료되었습니다.`);
        console.log('code', code, 'signal', signal);
        //워커 프로세스가 종료 되었을 때 새로 하나 생성
        cluster.fork(); 
    });
}
else{
    //워커들이 포트에서 대기
    http.createServer((req, res) => {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.write('<h1>Hello Node!</h1>');
        res.end('<p>Hello cluster!</p>');
        setTimeout(() => {
            process.exit(1);
        }, 1000)
    }).listen(8086);

    console.log(`${process.pid}번 워커 실행`);
}
//종료 메세지는 code 'process.exit의 인수로 넣어준 코드' signal '프로세스를 종료한 신호의 이름' 순으로 출력된다.
//오류 자체의 원인을 찾아 해결하는 것이 가장 좋으나, 예기치 못한 오류로 인한 서버 종료를 방지하기 위해 클러스터링 적용
//실무에서는 pm2등의 모듈로 cluster기능 사용
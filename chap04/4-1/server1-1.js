//콜백함수를 사용하지 않는 방안
//서버가 자동으로 변경사항을 반영하지 않는다. 새롭게 반영하려면 종료 후 다시 실행해야함.
const http = require('http');
let port = 8080;

const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8' });
    res.write('<h1>Hello Node!</h1>');
    res.end('<p>Hello Server!</p>');
});
server.listen(port);

server.on('listening', () => { //listening 이벤트 리스너
    console.log(`${port}번 포트에서 서버 대기 중입니다.`);
});

server.on('error', (error) => { //error 이벤트 리스너
    console.error(error);
});
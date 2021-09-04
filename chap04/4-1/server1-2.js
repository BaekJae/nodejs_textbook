//createServer를 원하는 만큼 호출하여, 여러 서버를 한번에 실행할 수 있다.
const http = require('http');

http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.write('<h1>Hello Node!</h1>');
    res.end('<p>Hello Server!</p>');
})
    .listen(8080, () => { // 서버 연결
        console.log(`8080번 포트에서 대기중...`);
    });

http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type' : 'text/html; charset=utf-8' });
    res.write('<h1>Hello Node!</h1>');
    res.end('<p>Hello Server!</p>');
})
    .listen(8081, () => { // 서버 연결
        console.log(`8081번 포트에서 대기중...`);
    });
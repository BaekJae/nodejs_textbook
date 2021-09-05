//쿠키는 문자열 형식으로 존재. 쿠키 간에는 세미콜론으로 구분
//브라우저는 응답의 헤더(Set-Cookie)에 따라 쿠키를 저장
const http = require('http');

http.createServer((req, res) => {
    //createServer의 콜백에서는 req객체에 담긴 쿠키를 가져온다. req.headers.cookie에 쿠키가 들어있음
    console.log(req.url, req.headers.cookie);
    //req.url과 res.headers.cookie에 대한 정보를 로깅, req.url은 주소의 path와 search부분을 알림
    res.writeHead(200, { 'Set-Cookie' : 'mycookie=test' });
    //응답의 헤더에 쿠키 기록, Set-Cookie는 브라우저한테 쿠키를 저장하라는 의미
    //응답을 받은 브라우저는 mycookie=test라는 쿠키를 저장
    res.end('Hello Cookie');
})
    .listen(8083, () => {
        console.log('8083번 포트에서 대기중입니다.');
    });
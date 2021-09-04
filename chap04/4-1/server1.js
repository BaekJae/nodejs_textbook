const http = require('http');
let port = 8080;

http.createServer((req, res) =>{
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    res.write('<h1>Hello Node!</h1>');
    res.end('<p>Hello Server!</p>');
    //res.writeHead, res.write, res.end
    //res.writeHead -> 응답에 대한 정보 기록, 첫 번째 인수로 성공적인 요청을 의미하는 200(응답 번호)
    //두 번째 인수로 응답에 대한 정보(콘텐츠의 형식이 HTML임을 알린다. 한글 표시를 위해 charset을 utf-8로 지정
    //res.write -> 첫 번째 인수는 클라이언트로 보낼 데이터(HTML, buffer 등), 여러 번 호출하여 데이터를 여러 개 보내도 된다.
    //res.end -> 응답 종료. 인수가 있다면 그 데이터도 클라이언트로 보내고 응답 종료
})
    .listen(port, () => { //서버 연결 -> listen메서드 뒤에 포트 번호와 포트 연결 완료 후 실행될 콜백 함수
        console.log(`${port}번 포트에서 대기 중입니다!`);
    });
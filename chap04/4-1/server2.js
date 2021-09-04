//미리 html파일을 만들어 html파일을 fs모듈로 읽어 전송한다.
const http = require('http');
const fs = require('fs').promises;

http.createServer(async (req, res) => {
    try{
        const data = await fs.readFile('./server2.html');
        res.writeHead(200, { 'Content-Type' : 'text/html; charset=utf-8' });
        res.end(data);
        //data변수에 저장된 버퍼를 그대로 클라이언트에 send.
    } catch (err) {
        console.error(err);
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end(err.message);
        //에러 발생시 일반 메세지, 에러는 일반 문자열이므로 text/plain
    }
})
    .listen(8081, () => {
        console.log('8081번 포트에서 대기중...')
    })

//2XX: 성공을 알리는 상태 코드, 자주 사용되는 코드 => 200(성공), 201(작성됨)
//3XX: 리다이렉션(다른 페이지 이동)을 알리는 상태 코드, 어떤 주소를 입력했는데 다른 주소의 페이지로 이동할 때 코드 사용
//자주 사용되는 코드 => 301(영구 이동), 302(임시 이동), 304(수정되지 않음)
//코드 304 => 요청의 응답으로 캐시를 사용했다.
//4XX: 요청 오류, 요청 자체에 오류가 있을 때 표시된다
//자주 사용되는 코드 => 400(잘못된 요청), 401(권한 없음), 403(금지됨), 404(찾을 수 없음)
//5XX: 서버 오류, 요청은 제대로 왔지만 서버에 오류가 생겼을 때 발생
//오류를 직접 res.writeHead로 클라이언트에 직접 보내는 경우는 거의 없음, 예기치 못한 에러 발생시 서버가 알아서 5XX대 코드 전송
//자주 사용되는 코드 => 500(내부 서버 오류), 502(불량 게이트웨이), 503(서비스를 사용할 수 없음)

//요청이 성공하든, 실패하든 요청을 클라이언트로 보내서 요청이 마무리 되었음을 알려야한다.
//응답을 보내지 않으면, 클라이언트는 서버로부터 응답이 오길 하염없이 기다리다가 일정 시간 후 Timeout(시간 초과)처리
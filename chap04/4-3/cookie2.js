const http = require('http');
const fs = require('fs').promises;
const url = require('url');
const qs = require('querystring');

const parseCookies = (cookie = '') =>
    cookie
        .split(';')
        .map(v => v.split('='))
        .reduce((acc, [k, v]) => {
            acc[k.trim()] = decodeURIComponent(v);
            return acc;
        }, {});
//쿠키는 mycookie=test같은 문자열, 자바스크립트 객체 형식으로 변경 -> 이 함수를 거치면 { mycookie: 'test' }가 된다.
//parseCookies 함수가 문자열을 객체로 바꿔준다.

http.createServer(async (req, res) => {
    const cookies = parseCookies(req.headers.cookie);

    //주소가 /login으로 시작하는 경우
    if(req.url.startsWith('/login')) {
        const { query } = url.parse(req.url);
        const { name } = qs.parse(query);
        //주소가 /login으로 시작하면 url, querystring모듈로 각각 주소와 주소에 딸려오는 query분석
        const expires = new Date();
        //쿠키 유효 시간을 현재 시간 + 5분으로 설정
        expires.setMinutes(expires.getMinutes() + 5);
        res.writeHead(302, {
            Location: '/',
            'Set-Cookie': `name=${encodeURIComponent(name)}; Expires= ${expires.toGMTString()}; HttpOnly; path=/`,
        });
        //302응답 코드, 리다이렉트 주소와 함께 쿠키를 헤더에 넣는다.
        //헤더에는 한글 사용 X -> name변수를 encodeURIComponent메서드로 인코딩
        //Set-Cookies의 값으로는 제한된 ASCII코드만 들어가므로 줄바꿈을 넣으면 안됨
        res.end();
    }

    //'/login'외의 주소로 접속하면 쿠키가 있는지 없는지를 먼저 확인한다.

    //name이라는 쿠키가 있을 경우
    else if(cookies.name){
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end(`${cookies.name}님 안녕하세요`);
        //쿠키가 있다면 로그인한 상태로 간주하여 인사말을 보낸다.
    }
    //쿠키가 없다면 로그인할 수 있는 페이지를 보낸다.
    else{
        try{
            const data = await fs.readFile('./cookie2.html');
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(data);
            //처음 방문하면 쿠키가 없으므로 cookie2.html이 전송된다.
        } catch(err) {
            res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end(err.message);
        }
    }
})
    .listen(8084, () => {
        console.log('8084번 포트에서 대기중...')
    })

//쿠키명=쿠키값: 기본적인 쿠키의 값. mycookie=test or name=zerocho와 같이 설정
//Expires=날짜: 만료 기한. 이 기한이 지나면 쿠키가 제거됨. 기본값은 클라이언트가 종료될 때까지
//Max-age=초: 날짜 대신 초를 입력. 해당 초가 지나면 쿠키가 제거, Expires보다 우선함
//Domain=도메인명: 쿠키가 전송될 도메인 특정, 기본값은 현재 도메인
//Path=URL: 쿠키가 전송될 URL특정. 기본값은 '/', 이 경우 모든 URL에서 쿠키 전송
//Secure: HTTPS일때만 쿠키가 전송
//HttpOnly: 설정 시 자바스크립트에서 쿠키 접근 X, 쿠키 조작을 방지하기 위해 설정
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

dotenv.config();
const app = express();
app.set('port', process.env.PORT || 4000);

//미들웨어와 일반 요청의 차이 => next가 인자로 존재하느냐 존재하지않느냐
app.use(morgan('dev'));
//morgan -> 요청과 응답에 대한 정보를 콘솔에 기록한다. 인수로 dev,combined,common,short,tiny 등
//dev와 나머지의 차이 -> dev는 오류 코드에 색깔 기입, 나머지는 아님(특히 combined는 접속 환경이 보인다.)
app.use('/', express.static(path.join(__dirname, 'public')));
//static 미들웨어 -> 정적인 파일들을 제공하는 라우터 역할
//app.use('요청 경로', express.static('실제 경로')); -> 함수의 인수로 정적 파일들이 담겨 있는 폴더 지정
//public폴더를 만들고 css나 js, 이미지 파일들을 public폴더에 넣으면 브라우저에서 접근 가능
//요청 주소에는 public이 들어있지 않다.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//urlencoded는 주소 형식으로 데이터를 보내는 방식
//extended: false면 노드의 querystring모듈을 사용하여 쿼리스트링 해석
//extended: true면 npm패키지의 qs모듈을 사용하여 쿼리스트링 해석(querystring모듈의 기능을 확장한 것이 qs모듈)
//express 4.16.0버전부터 body-parser 미들웨어의 일부 기능이 익스프레스에 내장되었다.(json, url-encoded 방식 처리)
app.use(bodyParser.raw());
app.use(bodyParser.text());
//버퍼나 텍스트 요청을 처리할 필요가 있다면 body-parser 를 설치한 후 위 2줄을 추가한다.
//body-parser패키지는 내부적으로 스트림을 처리해 req.body에 추가한다.
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
    name: 'session-cookie',
}))

app.use((req, res, next) => {
    console.log('모든 요청에 다 실행됩니다.');
    next();
});
app.get('/', (req, res, next) => {
    console.log('GET /요청에서만 실행');
    next();
}, (req, res) => {
    throw new Error('에러는 에러처리 미들웨어로');
});

app.use((err, req, res, next) => {
    //에러 처리 미들웨어는 err이 인자로 있다.
    console.error(err);
    res.status(500).send(err.message);
});
app.get('/', (req, res) => {
    //res.send('Hello, Express');
    //해당 문장을 응답
    res.sendFile(path.join(__dirname, '/index.html'));
    //index.html파일을 응답으로 보낸다.
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기중');
});
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');

dotenv.config();
const indexRouter = require('./routes');
const userRouter = require('./routes/user');
const app = express();
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
/*app.set('view engine', 'html');
//넌적스 기준 html을 그대로 써도 상관없으나, 넌적스임을 구분하려면 확장자로 njk를 쓰면 된다.
//단 이때는 view engine도 njk로 바꿔야 한다.

nunjucks.configure('views', {
    express: app, //express속성에 app객체 연결
    watch: true, //watch옵션이 true이면 html파일이 변경될 때 템플릿 엔진을 다시 렌더링
});*/
//첫 번째 인수로 views폴더의 경로, 두 번째 인수로 옵션

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
//app.use(cookieParser(비밀키)); -> 요청의 cookie를 해석해 req.cookies객체로 만든다.
//첫 번째 인수: 비밀키. 서명된 인수가 있다면 비밀 키를 통해 해당 쿠키가 내 서버가 만든 쿠키임을 검증 가능
//쿠키는 비밀 키를 통해 만들어낸 서명을 쿠키 값 뒤에 붙인다.
//서명된 쿠키는 name=zerocho.sign과 같은 모양, 서명된 쿠키는 req.cookies대신 req.signedCookies객체에 들어있다.

//쿠키 생성 -> res.cookie,쿠키 제거 -> req.clearCookie메서드 사용, res.cookie(키, 값, 옵션)형식으로 사용
//옵션은 쿠키 옵션과 동일하다.(domain, expires, httpOnly, maxAge, path, secure 등)
//쿠키를 지우려면 키와 값 외에 옵션도 일치해야 쿠키가 지워진다. expires와 maxAge옵션을 일치할 필요가 없다.
//signed옵션을 true로 설정하면 쿠키 뒤에 서명이 붙는다.
//서명을 위한 비밀 키는 cookieParser미들웨어에 인수로 넣은 process.env.COOKIE_SECRET이 된다.
app.use(session({
    resave: false, //요청이 올 때 세션에 수정 사항이 생기지 않아도 세션을 다시 저장할지 설정
    saveUninitialized: false, //세션에 저장할 내역이 없더라도 처음부터 세션을 생성할지 설정
    secret: process.env.COOKIE_SECRET, //쿠키 서명, cookie-parser의 secret과 같이 설정
    cookie: {
        httpOnly: true, //클라이언트에서 쿠키를 확인하지 못하게 함(false시 이 반대)
        secure: false, //https가 아닌 환경에서도 사용 가능(true시 이 반대)
    },
    name: 'session-cookie', //쿠키의 이름 설정, 기본 이름은 connect.sid
}))
//cookie-parser 미들웨어 뒤에 놓는 것이 안전하다.
//express-session은 인수로 세션에 대한 설정을 받는다.
//store 옵션 -> 해당 옵션이 없으면 서버를 재시작하면 메모리가 초기화되어 세션이 모두 사라진다.(현재 - 메모리에 세션 저장)
//store에 데이터베이스를 연결하여 세션을 유지하는 것이 좋다(보통 레디스가 자주 쓰인다)

app.use('/', indexRouter);
app.use('/user', userRouter);

app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`)
    error.status = 404;
    next(error);
});
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.render('error');
    //에러 처리 미들웨어는 err이 인자로 있다.
    /*console.error(err);
    res.status(500).send(err.message);*/
});

const multer = require('multer');
const fs = require('fs');

try{
    fs.readdirSync('uploads'); //uploads폴더를 읽어옴
} catch(error) {
    console.error('uploads폴더가 없어 uploads폴더 생성');
    fs.mkdirSync('uploads'); //uploads폴더 생성
}
const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, done) { //req매개변수 - 요청에 대한 정보
            done(null, 'uploads/');
            //done함수 -> 첫 번째 인수는 에러가 있다면 에러, 두 번째 인수는 실제 경로나 파일 이름
            //req나 file의 데이터를 가공해서 done으로 넘기는 형식
        },
        filename(req, file, done){ //req매개변수 - 업로드한 파일에 대한 정보
            const ext = path.extname(file.originalname);
            done(null, path.basename(file.originalname, ext) + Date.now() + ext);
            //uploads라는 폴더에 [파일명+현재시간.확장자]파일명으로 업로드
            //현재 시간을 넣는 이유는 업로드하는 파일명이 겹치는 것을 막기 위함
            //uploads폴더가 서버에 존재해야 하며, 없다면 직접 만들거나 fs모듈을 사용하여 서버를 시작할 때 생성해야 한다.
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
})
app.get('/upload', (req, res) => {
    res.sendFile(path.join(__dirname, 'multipart.html'));
});
app.post('/upload',
    upload.fields([{ name: 'image1' }, { name: 'image2'}]),
    (req, res) => {
    console.log(req.files, req.body);
    res.send('ok');
    },
);

app.use((req, res, next) => {
    console.log('모든 요청에 다 실행됩니다.');
    next();
});

app.use((req,res,next) => {
    req.data = '데이터 넣기';
    next();
}, (req,res,next) => {
    console.log("req.data:", req.data);
    next();
});
app.get('/', (req, res, next) => {
    console.log('GET /요청에서만 실행');
    next();
}, (req, res) => {
    throw new Error('에러는 에러처리 미들웨어로');
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
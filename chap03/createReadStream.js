const fs = require('fs');

const readStream = fs.createReadStream('./readme3.txt',{ highWaterMark: 16 });
//읽기 스트림 생성
//createReadStream의 첫 번째 인수는 읽을 파일 경로, 두 번째 인수는 옵션 객체
//hignWaterMark옵션이 버퍼의 크기(바이트 단위)를 정할 수 있고, 기본값은 64KB

const data = [];

readStream.on('data', (chunk) => {
    data.push(chunk);
    console.log('data :', chunk, chunk.length);
});

readStream.on('end', () => {
    console.log('end : ', Buffer.concat(data).toString());
});

readStream.on('error', (err) => {
    console.log('error : ', err);
});
//readStream은 이벤트 리스너를 붙여 사용한다.
//보통 data, end, error이벤트 사용 => 읽는 도중 에러가 발생하면 error이벤트 호출, 읽기가 시작되면 data이벤트 발생, 다 읽으면 end이벤트
//highWaterMark옵션에 지정된 크기보다 크다면 여러번 발생 가능
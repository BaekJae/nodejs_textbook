//콜백함수 readFile
const fs = require('fs');

fs.readFile('./readme.txt', (err,data) => {
    if(err) {
        throw err;
    }
    console.log(data);
    console.log(data.toString());
})
//fs모듈을 불러온 뒤 읽을 파일의 경로 지정, 경로가 node명령어를 실행하는 콘솔 기준이라는 점 유의
//콜백함수로 readFile메서드의 인수로 넣고 콜백함수의 매개변수로 에러 또는 데이터를 받는다.

//readFile의 결과물은 버퍼 형식으로 제공됨. 사람이 읽을 수 없기 때문에 toString을 사용해 문자열로 변환
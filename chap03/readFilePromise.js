//프로미스 방식 readFile(실무에 더 많이 사용)
const fs = require('fs').promises; //프로미스 기반의 fs모듈 로드

fs.readFile('./readme.txt')
    .then((data) => {
        console.log(data);
        console.log(data.toString());
    })
    .catch((err) => {
        console.error(err);
    });
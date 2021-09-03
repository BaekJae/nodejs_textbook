//createReadStream으로 파일을 읽고 스트림을 전달받아 createWriteStream으로 파일을 쓸 수도 있다.
//스트림끼리 연결하는 것을 '파이핑한다'고 표현한다.

const fs = require('fs');

const readStream = fs.createReadStream('readme4.txt');
const writeStream = fs.createWriteStream('writeme3.txt');
readStream.pipe(writeStream);
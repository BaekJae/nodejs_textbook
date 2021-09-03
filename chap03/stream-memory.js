//createBigFile.js를 실행해야 정상적으로 코드가 동작
//스트림을 사용한 파일 복사
//큰 파일을 조각내어 작은 버퍼단위로 옮긴다. 스트림을 사용하면 효과적으로 데이터를 전송할 수 있다.
//동영상같은 큰 파일들을 전송할 때 이러한 이유로 스트림을 사용한다.
const fs = require('fs');

console.log('before: ', process.memoryUsage().rss);

const readStream = fs.createReadStream('./big.txt');
const writeStream = fs.createWriteStream('./big3.txt');
readStream.pipe(writeStream);
readStream.on('end', () => {
    console.log('stream: ', process.memoryUsage().rss);
});
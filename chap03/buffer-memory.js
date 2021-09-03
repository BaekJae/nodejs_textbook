//createBigFile.js 먼저 실행해야 코드가 정상동작
//big.txt를 big2.txt로 복사
//메모리 용량이 급상승한다.
//이전 용량의 파일을 복사하기 위해, 메모리에 파일을 모두 올려둔 후 writeFileSync를 수행하기 때문이다.
const fs = require('fs');

console.log('before: ', process.memoryUsage().rss);

const data1 = fs.readFileSync('./big.txt');
fs.writeFileSync('./big2.txt', data1);
console.log('buffer: ', process.memoryUsage().rss);
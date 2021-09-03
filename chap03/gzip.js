const zlib = require('zlib');
const fs = require('fs');

const readStream = fs.createReadStream('./readme4.txt');
const zlibStream = zlib.createGzip();
//zlib의 createGzip메서드가 스트림을 지원, readStream과 writeStream 중간에서 파이핑 가능
//버퍼 데이터가 전달되다가 gzip압축을 거친 후 파일로 저장
const writeStream = fs.createWriteStream('./readme4.txt.gz');
readStream.pipe(zlibStream).pipe(writeStream);
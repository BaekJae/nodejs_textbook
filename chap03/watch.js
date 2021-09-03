//nodemon과 같이 실시간으로 파일의 변경사항 업데이트
const fs = require('fs');

fs.watch('./target_new.txt', (eventType, filename) => {
    console.log(eventType, filename);
});
const fs = require('fs').promises;

fs.copyFile('readme4.txt', 'writeme4.txt')
    .then(() => {
        console.log('복사 완료');
    })
    .catch((error) => {
        console.error(error);
    });
//첫 번째 인수로 복사할 파일, 두 번째 인수로 복사될 경로, 세 번째 인수로 복사 후 실행될 콜백 함수

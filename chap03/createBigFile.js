//현재 드라이브에 충분한 용량이 남아있는 지 확인하고 실행해야 한다.
//파일 용량이 크므로(1GB) 시간이 조금 많이 소요될 수 있다.

const fs = require('fs');
const file = fs.createWriteStream('./big.txt');

for(let i = 0; i <= 10000000; i++){
    file.write('안녕하세요. 엄청나게 큰 파일을 만들어 볼 겁니다. 각오 단단히 하세요!\n');
}
file.end();
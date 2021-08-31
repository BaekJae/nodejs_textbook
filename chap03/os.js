const os = require('os');

console.log('운영체제 정보---------------------------------');
console.log('os.arch():', os.arch()); //process.arch()와 동일
console.log('os.platform():', os.platform()); //process.platform()과 동일
console.log('os.type():', os.type()); //os종류
console.log('os.uptime():', os.uptime()); //os부팅 이후 흐른 초
console.log('os.hostname():', os.hostname()); //컴퓨터 이름
console.log('os.release():', os.release()); //os version

console.log('경로-----------------------------------------');
console.log('os.homedir():', os.homedir()); //홈 디렉터리 경로
console.log('os.tmpdir():', os.tmpdir()); //임시 파일 저장 경로

console.log('cpu 정보-------------------------------------');
console.log('os.cpus():', os.cpus()); //코어 정보
console.log('os.cpus().length:', os.cpus().length); // 코어의 개수(숫자)

console.log('메모리 정보-----------------------------------');
console.log('os.freemem():', os.freemem()); //사용 가능한 메모리
console.log('os.totalmem():', os.totalmem()); //전체 메모리 용량
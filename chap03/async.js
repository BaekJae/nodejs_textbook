const fs = require('fs');

console.log('시작');
fs.readFile('./readme2.txt', (err, data) => {
    if(err) {
        throw err;
    }
    console.log('1번', data.toString());
})
fs.readFile('./readme2.txt', (err, data) => {
    if(err) {
        throw err;
    }
    console.log('2번', data.toString());
})
fs.readFile('./readme2.txt', (err, data) => {
    if(err) {
        throw err;
    }
    console.log('3번', data.toString());
})
console.log('끝');

//비동기 메서드 매커니즘
//백그라운드에 파일을 읽으라고만 요청, 따라서 이 코드에서는 읽기 요청만 3번 보내고, console.log('끝')실행
//읽기가 완료되면 백그라운드가 메인 스레드에 알리고, 메인 스레드가 그제서야 등록된 콜백 실행
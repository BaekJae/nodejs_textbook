//비동기 방식, 순서 유지 -> Callback Hell(콜백지옥)
const fs = require('fs');

console.log('시작');
fs.readFile('./readme2.txt', (err,data) => {
    if(err){
        throw err;
    }
    console.log('1번', data.toString());
    fs.readFile('./readme2.txt', (err,data) => {
        if(err){
            throw err;
        }
        console.log('2번', data.toString());
        fs.readFile('./readme2.txt', (err,data) => {
            if(err){
                throw err;
            }
            console.log('3번', data.toString());
            console.log('끝');
        });
    });
});
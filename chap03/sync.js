//순서대로 출력하기
const fs = require('fs');

console.log('시작');
let data = fs.readFileSync('./readme2.txt');
//콜백 대신 리턴값을 바로 사용 -> 다음 줄부터 바로 사용 가능
console.log('1번', data.toString());
data = fs.readFileSync('./readme2.txt');
console.log('2번', data.toString());
data = fs.readFileSync('./readme2.txt');
console.log('3번', data.toString());
console.log('끝');

//요청이 수백 개 이상 들어오면 성능에 문제가 생김. Sync메서드는 이전 작업이 완료되어야 다음 작업 진행
//백그라운드가 작업하는 동안 메인 스레드는 아무것도 하지 못하고 대기
//Sync메서드를 사용하면 백그라운드조차 동시 처리 X
//처음 실행할 때 초기화 용도로만 동기 메서드 사용 권장
//대부분의 경우 비동기 메서드가 훨씬 효율적
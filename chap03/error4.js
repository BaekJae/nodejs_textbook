//예측 불가 에러
process.on('uncaughtException', (err) => {
    console.error('예기치 못한 에러', err);
});

setInterval(() => {
    throw new Error('서버를 고장내주마!');
},1000);

setTimeout(() => {
    console.log('실행됩니다.');
},2000);
//처리하지 못한 에러가 발생했을 때 uncaughtException이벤트 리스너가 실행되고 프로세스가 유지
//만약 없다면 예제에서는 setTimeout이 실행되지 않는다.
//실행 후 1초만에 setInterval에서 에러가 발생하여 프로세스가 멈추기 때문이다.
//하지만, uncaughtException 이벤트 리스너가 연결되어있으므로 프로세스가 종료되지 않는다.
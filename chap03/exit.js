let i=1;
setInterval(() => {
    if(i === 5){
        console.log('종료!');
        process.exit();
    }
    console.log(i);
    i += 1;
},1000);
//process.exit()가 없다면, 해당 Interval문은 계속 돌아가게 된다.
//1초마다 i가 1씩 증가하는 구문
//1 : 비정상 종료, 0 : 정상 종료, 인자 없음 : 정상 종료
//process.exit()내부 인자에 1이나 0을 넣어 정상 종료인지 비정상 종료인지 전달할 수 있다.
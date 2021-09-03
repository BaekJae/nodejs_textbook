setInterval(() => {
    console.log('시작');
    try{
        throw new Error('서버를 고장내주마!'); // 에러 발생
    } catch (err) {
        console.log(err);
    }
},1000);
//에러를 throw하면 노드 프로세스가 멈출 수 있으므로, try/catch문으로 throw한 에러를 잡아야 한다.
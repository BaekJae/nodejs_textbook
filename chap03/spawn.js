const spawn = require('child_process').spawn;

const process = spawn('python',['test.py']);
//spawn의 첫 번째 인수로 명령어를, 두 번째 인수로 옵션 배열을 넣으면 됨
//git bash나 여타 콘솔의 실행방식처럼 진행

process.stdout.on('data', function(data) {
    console.log(data.toString());
}); //실행 결과

process.stderr.on('data', function(data){
    console.error(data.toString());
}); //실행 에러

//결과는 exec과 동일

//exec- 셸을 싱핼해서 명령어를 수행, spawn- 새로운 프로세스를 띄우면서 명령어를 실행
//spawn도 세 번째 인수로 { shell: true }를 부여하면 exec처럼 셸을 실행해서 명령어 수행
//셸을 실행하는지 아닌지에 따라 수행 가능한 명령어에 차이 존재
const exec = require('child_process').exec;

const process = exec('dir');
//첫 번째 인수로 명령어
//리눅스나 맥이라면 exec('ls')를 입력하면 된다.
//실행하면 현재 폴더의 파일 목록 표시

process.stdout.on('data', function(data){ //표준출력
    console.log(data.toString());
}); //실행 결과

process.stderr.on('data', function(data){ //표준에러
    console.log(data.toString());
}); //실행 에러

//결과는 표준출력과 표준에러에 붙여둔 data 이벤트 리스너에 버퍼형태로 전달
//성공적인 결과는 표준출력, 실패한 결과는 표준에러에서 표시
const crypto = require('crypto');

const pass = 'pass';
const salt = 'salt';
const start = Date.now();

crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', ()=>{
    console.log('1:', Date.now() - start);
})

crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', ()=>{
    console.log('2:', Date.now() - start);
})

crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', ()=>{
    console.log('3:', Date.now() - start);
})

crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', ()=>{
    console.log('4:', Date.now() - start);
})

crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', ()=>{
    console.log('5:', Date.now() - start);
})

crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', ()=>{
    console.log('6:', Date.now() - start);
})

crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', ()=>{
    console.log('7:', Date.now() - start);
})

crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', ()=>{
    console.log('8:', Date.now() - start);
})

//출력 단위 ms
//실행 될 때마다 시간과 순서가 바뀐다.
//1~4와 5~8이 그룹으로 묶여있고, 5~8이 1~4보다 시간이 더 소요된다.
//기본적인 스레드풀의 개수가 4개이기 때문에 처음 네 작업이 동시 실행되고, 종료되면 다음 네 개의 작업이 실행됨
//스레드풀의 개수를 조절할 수 있음. 직접 컨트롤 할 순 없음
//스레드풀 개수 조절법
//Windows => 명령 프롬프트에 SET UV_THREADPOOL_SIZE=개수
//MAC, LINUX => 터미널에서 UV_THREADPOOL_SIZE=개수
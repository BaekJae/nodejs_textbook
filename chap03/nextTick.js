setImmediate(() => {
    console.log('immediate');
});
process.nextTick(() => {
   console.log('nextTick');
});
setTimeout(() => {
    console.log('timeout');
},0);
Promise.resolve().then(() => console.log('promise'));
//실행순서 => nextTick -> Promise -> timeout -> immediate
//process.nextTick과 Promise는 마이크로태스크(microtask)로 구분지어 부른다.
/*const condition = true; //true - resolve, false - reject
const promise = new Promise((resolve, reject) => {
    if(condition) {
        resolve('complete');
    } else {
        reject('fail');
    }
});
//another code can came in here
promise.then((message) => { //성공시
    console.log(message);
}).catch((error) => {  //실패
    console.log(error);
}).finally(() => { // 끝나면 무조건 실행되는 구문
    console.log('anyway');
})*/

//Promise all -> 하나라도 Reject일시 catch구문 실행
const promise1 = Promise.resolve('성공1');
const promise2 = Promise.resolve('성공2');
Promise.all([promise1, promise2])
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.error(error);
    });
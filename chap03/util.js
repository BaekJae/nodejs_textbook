const util = require('util');
const crypto = require('crypto');

const dontUseMe = util.deprecate((x,y) => {
    console.log(x + y);
}, 'dontUseMe function is deprecated');
//util.deprecate : 함수가 deprecated처리 되었을 때 알림. 첫 번째 인수의 함수를 사용했을 때 경고 메세지 출력, 두 번째 인수로 경고메세지
dontUseMe(1,2);

const randomBytesPromise = util.promisify(crypto.randomBytes);
//util.promisify : 콜백 패턴을 프로미스 패턴으로 변경. 바꿀 함수를 인수로 제공하면 된다
//이렇게 바꾸면 async/await패턴까지 사용할 수 있다.
//프로미스를 콜백으로 바꾸는 util.callbackify도 있으나, 자주 사용되진 않는다.
randomBytesPromise(64)
.then((buf) => {
    console.log(buf.toString('base64'));
})
.catch((error) => {
    console.error(error);
});
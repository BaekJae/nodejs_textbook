//모듈 export
/*const odd = '홀수입니다.';
const even = '짝수입니다.';

module.exports={
    odd,
    even,
}*/

console.log(require.main === module);
console.log(require.main.filename);
//export 객체만을 이용하여 모듈화
exports.odd = '홀수입니다.';
exports.even = '짝수입니다.';
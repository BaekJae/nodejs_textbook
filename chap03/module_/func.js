//var.js를 모듈로 import, 자체적으로 모듈 export
//import { odd, even } from ('./var.js'); -> 사용불가
//위 문을 사용하려면 mjs확장자를 활용하거나, package.json을 활용해야한다.
//mjs에서 module을 활용하려면, 애초에 export를 export default로 해야 한다.
const { odd, even } = require('./var.js');

function checkOddOrEven(num){
    if(num % 2){ //나머지가 0이 아니다 = 홀수이다.
        return odd;
    }
    return even; //홀수가 아니면 짝수
}

module.exports = checkOddOrEven;
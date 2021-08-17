//구조분해 할당 설명 코드
/*var candyMachine = {
    status: {
        name: 'node',
        count: 5,
    },
    getCandy: function(){
        this.status.count--;
        return this.status.count;
    },
};
var getCandy = candyMachine.getCandy;
var count = candyMachine.status.count;*/

//아래와 같은 코드로 바꿀 수 있음

const candyMachine = {
    status: {
        name: 'node',
        count: 5,
    },
    getCandy() {
        this.status.count--;
        console.log(this.count);
        return this.status.count;
    },
};
const {getCandy, status : {count}} = candyMachine;
//객체 내 속성을 찾아 변수와 매칭, 여러 단계 내 속성도 찾을 수 있음
//구조분해 할당 사용시 함수의 this가 바뀔 수 있다. -> 달라진 this를 바꾸려먼 bind함수 필요
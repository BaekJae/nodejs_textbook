//var 활용 방식
var sayNode = function() {
    console.log('Node');
};
var es = 'ES';
/*var oldObject = {
    sayJS: function() {
        console.log('JS');
    },
    sayNode: sayNode,
};
oldObject[es + 6] = 'Fantastic';
oldObject.sayNode(); // sayNode 함수 실행
oldObject.sayJS(); // sayJS함수 실행
console.log(oldObject.ES6);// Fantastic 출력*/

//const 활용방식 => object생성 방식만 차이 존재 -> 객체의 메서드 함수 연결시 콜론과 function 미기입, 속성명과 변수명이 동일하면 한번만 기입
const newObject = {
    sayJS() {
        console.log('JS');
    },
    sayNode,
    [es + 6]: 'Fantastic', //객체 리터럴 안에 동적 속성 선언
};
newObject.sayNode();
newObject.sayJS();
console.log(newObject.ES6);
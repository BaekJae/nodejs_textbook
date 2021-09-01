const url = require('url');

const { URL } = url;
const myURL = new URL('http://www.gilbut.co.kr/book/bookList.aspx?sercate1=001001000#anchor');
//WHATWG의 url, 분석 시에 username, password, origin, searchParams 속성 존재(하단 url 분석 결과에는 존재 X)
console.log('new URL():', myURL);
console.log('url format():', url.format(myURL));
console.log('-------------------------------------------------------');
const parsedURL= url.parse('http://www.gilbut.co.kr/book/booklist.aspx?sercate1=001001000#anchor');
//url.parse(주소) -> 주소를 분해, username,password 대신 auth속성, searchParams대신 query속성
//url.format(객체) -> WHATWG방식 url과 기존 노드 url 모두 사용 가능, 분해되었던 url객체를 원래 상태로 조립한다.
console.log('url.parse():',parsedURL);
console.log('url.format():',url.format(parsedURL));
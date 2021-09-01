const { URL } = require('url');

const myURL = new URL('http://www.gilbut.co.kr/?page=3&limit=10&category=nodejs&category=javascript');
console.log('searchParams:', myURL.searchParams);
//url의 searchParams 출력
console.log('searchParams.getAll():', myURL.searchParams.getAll('category'));
//getAll(키) => 키에 해당하는 모든 값들을 가져온다.
console.log('searchParams.get():', myURL.searchParams.get('limit'));
//get(키) => 키에 해당하는 첫 번째 값을 가져온다.
console.log('searchParams.has():', myURL.searchParams.has('page'));
//has(키) => 키가 있는지 없는지 검사한다.

console.log('searchParams.keys():', myURL.searchParams.keys());
//keys() => searchParams의 모든 키를 반복기(iterator)(ES2015문법) 객체로 가져온다.
console.log('searchParams.values():', myURL.searchParams.values());
//values() => searchParams의 모든 값을 반복기 객체로 가져온다.

//filter key
myURL.searchParams.append('filter', 'es3');
//append(키, 값) => 키를 추가한다. 같은 키의 값이 있다면 유지하고 하나 더 추가한다.
myURL.searchParams.append('filter', 'es5');
console.log(myURL.searchParams.getAll('filter'));

myURL.searchParams.set('filter','es6');
//set(키, 값) => 같은 키의 값들을 모두 지우고 새로 추가한다.
console.log(myURL.searchParams.getAll('filter'));

myURL.searchParams.delete('filter');
//delete(키) => 해당 키를 제거한다.
console.log(myURL.searchParams.getAll('filter'));

console.log('searchParams.toString():', myURL.searchParams.toString());
//toString() => 조작한 searchParams객체를 다시 문자열로 만든다. 이 문자열을 search에 대입하면 주소 객체에 반영
myURL.search = myURL.searchParams.toString();

//query보다 searchParams가 유용한 이유는 query는 다음에 배우는 querystring 모듈을 한번 더 사용해야 한다.
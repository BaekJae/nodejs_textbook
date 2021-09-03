const buffer = Buffer.from('Change me to Buffer');
//from(문자열): 문자열을 버퍼로 바꾸고, length속성은 버퍼의 크기를 알린다. 바이트 단위
console.log('from():', buffer);
console.log('length:', buffer.length);
console.log('toString():', buffer.toString());
//toString(버퍼): 버퍼를 다시 문자열로. 이때 base64나 hex를 인수로 넣으면 해당 인코딩으로 변환 가능

const array = [Buffer.from('띄엄 '), Buffer.from('띄엄 '), Buffer.from('띄어쓰기')];
const buffer2 = Buffer.concat(array);
//concat(배열): 배열 안의 버퍼를 하나로 합친다.
console.log('concat():', buffer2.toString());

const buffer3 = Buffer.alloc(5);
//alloc(바이트): 빈 버퍼 생성, 바이트를 인수로 넣으면 해당 크기의 버퍼 생성
console.log('alloc():', buffer3);
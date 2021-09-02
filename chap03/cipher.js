//양방향 암호화
const crypto = require('crypto');

const algorithm = 'aes-256-cbc';
const key = 'abcdefghijklmnopqrstuvwxyz123456';
const iv = '1234567890123456';

const cipher = crypto.createCipheriv(algorithm, key, iv);
//crypto.createCipheriv(알고리즘, 키, iv) -> 이 코드에서는 aes-256-cbc 알고리즘 활용
//aes-256-cbc 알고리즘 -> 키가 32바이트, iv는 16바이트이어야 한다.
//iv는 암호화 할 때 사용하는 초기화 벡터를 의미
//crypto.getCiphers()를 호출하면 사용 가능한 알고리즘 목록 확인 가능

let result = cipher.update('암호화할 문장', 'utf8', 'base64');
//cipher.update(문자열, 인코딩, 출력 인코딩) -> 암호화할 대상, 대상의 인코딩, 출력 결과물의 인코딩을 넣는다.
//문자열은 utf8인코딩을 많이 사용하고, 암호는 base64를 많이 사용한다.

result += cipher.final('base64');
//cipher.final(출력 인코딩) -> 출력 결과물의 인코딩을 넣으면 암호화 완료

console.log('암호화:', result);

const decipher = crypto.createDecipheriv(algorithm, key, iv);
//crypto.createDecipheriv(알고리즘, 키, iv) -> 복호화할 때 사용. 암호화 할때 사용했던 알고리즘과 키, iv를 그대로 넣어야 한다.

let result2 = decipher.update(result, 'base64', 'utf8');
//decipher.update(문자열, 인코딩, 출력 인코딩) -> 암호화된 문장, 그 문장의 인코딩, 복호화할 인코딩을 넣는다.
//createCipheriv의 update()에서 utf8,base64순으로 넣었다면 createDecipheriv의 update()에서는 base64, utf8순으로 넣으면 된다.

result2 += decipher.final('utf8');
//decipher.final(출력 인코딩) -> 복호화 결과물의 인코딩을 넣는다.

console.log('복호화:',result2);
//단방향 암호화
const crypto = require('crypto');

//pbkdf2 = 기존 문자열에 salt라고 불리는 문자열을 붙이고 해시 알고리즘을 반복해서 적용
crypto.randomBytes(64,(err, buf) => {
    //randomBytes()를 이용하여 매번 실행할 때마다 결과가 바뀌는 방법
    const salt = buf.toString('base64');
    //64바이트 길이의 문자열을 만든다(salt)
    console.log('salt:', salt);
    crypto.pbkdf2('비밀번호', salt, 100000, 64, 'sha512', (err, key) => {
        //비밀번호, salt값, 반복 횟수, 출력 바이트, 해시 알고리즘을 인수로 부여
        //이 코드에서는 sha512로 변환된 결과값을 다시 sha512로 변환하는 과정을 10만번 반복한다.
        //느리다 싶으면 반복 횟수를 낮추고, 너무 빠르면 1초 정도가 될 떄까지 반복 횟수를 늘린다.(속도는 컴퓨터의 사양에 따라 좌우됨)
        console.log('password:', key.toString('base64'));
    });
});
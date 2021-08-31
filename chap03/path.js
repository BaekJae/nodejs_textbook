const path = require('path');

const string = __filename;

console.log('path.sep:', path.sep);
//경로 구분자. windows => '\', POSIX => '/'
console.log('path.delimiter:', path.delimiter);
//환경 변수의 구분자. windows => ';', POSIX => ':'
console.log('--------------------------------');
console.log('path.dirname():', path.dirname(string));
//파일이 위치한 폴더 경로
console.log('path.extname():', path.extname(string));
//파일의 확장자
console.log('path.basename():', path.basename(string));
//파일의 이름(확장자 포함), 이름만 표시하고 싶다면 두번째 인수로 확장자 기입
console.log('path.basename - extname:', path.basename(string, path.extname(string)));
//파일 이름 추출(확장자X)
console.log('--------------------------------');
console.log('path.parse():', path.parse(string));
//파일 경로를 root, dir, base, ext, name으로 분리
console.log('path.format():', path.format({
    dir: 'C:\\Users\\user',
    name: 'path',
    ext: '.js'
}));
//path.parse()한 객체를 파일 경로로 합친다.
console.log('path.normalize():', path.normalize('C://Users\\\\user\\path.js'));
// '/'나 '\'를 여러번 사용 혹은 혼용하면 정상 경로로 변환
console.log('--------------------------------');
console.log('path.isAbsolute(C:\\):', path.isAbsolute('C:\\'));
//파일의 경로가 절대경로인지 상대경로인지를 true나 false로 알려준다.
console.log('path.isAbsolute(./home):', path.isAbsolute('./home'));
console.log('--------------------------------');
console.log('path.relative():', path.relative('C:\\Users\\user\\path.js', 'C:\\'));
//경로를 2개 넣으면 첫 번째 경로에서 두 번째 경로로 가는 방법을 알려준다.
console.log('path.join():', path.join(__dirname, "..", "..", "/Users", ".", "/user"));
//여러 인수를 하나의 경로로 합친다. 상대경로도 알아서 처리한다('..'(부모 디렉터리) '.'(현 위치)).
console.log('path.resolve():', path.resolve(__dirname, "..", "Users", ".", "/user"));
//path.join과 유사하나, path.resolve는 '/'를 만나면 절대경로로 인식해서 앞 경로 무시, path.join은 상대경로로 처리한다.
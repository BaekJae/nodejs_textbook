const fs = require('fs').promises;
const constants = require('fs').constants;

fs.access('./folder', constants.F_OK | constants.W_OK | constants.R_OK)
    //fs.access(경로,옵션,콜백): 두 번째 인수로 상수들(F_OK: 파일 존재, R_OK: 읽기 권한, W_OK: 쓰기 권한)을 부여
    //권한이 없으면 에러, 파일/폴더가 없을 때의 에러 코드는 ENOENT
    .then(() => {
        return Promise.reject('이미 폴더 있음');
    })
    .catch((err) => {
        if (err.code === 'ENOENT') {
            console.log('폴더 없음');
            return fs.mkdir('./folder');
            //fs.mkdir(경로,콜백): 폴더를 만드는 메서드, 이미 폴더가 있으면 에러가 발생하므로 access메서드를 호출하여 확인
        }
        return Promise.reject(err);
    })
    .then(() => {
        console.log('폴더 만들기 성공');
        return fs.open('./folder/file.js', 'w');
        //fs.open(경로, 옵션, 콜백): 파일의 아이디(fd변수)를 가져오는 메서드, 파일이 없으면 생성한 뒤 아이디를 가져온다.
        //두 번째 인수로 어떤 동작을 할 지 부여(쓰기:w, 읽기:r, 기존 파일에 추가:a)
    })
    .then((fd) => {
        console.log('빈 파일 만들기 성공\n', fd);
        return fs.rename('./folder/file.js', './folder/newfile.js');
        //fs.rename(기존 경로, 새 경로, 콜백):파일의 이름을 바꾸는 메서드, 기존 파일 위치와 새로운 파일 위치 지정
        //굳이 같은 위치를 지정할 필요는 없으므로 잘라내기와 같은 기능을 할 수 있음.
    })
    .then(() => {
        console.log('이름 바꾸기 성공');
    })
    .catch((err) => {
        console.error(err);
    });
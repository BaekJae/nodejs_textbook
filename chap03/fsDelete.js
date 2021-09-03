const fs = require('fs').promises;

fs.readdir('./folder')
    //fs.readdir(경로, 콜백): 폴더 내용물 확인, 배열 안에 파일과 폴더명이 나온다.
    .then((dir) => {
        console.log('폴더 내용 확인', dir);
        return fs.unlink('./folder/newFile.js');
        //fs.unlink(경로, 콜백): 파일을 지울 수 있다. 파일이 없으면 에러 발생, 파일이 있는지를 꼭 확인해야함
    })
    .then(() => {
        console.log('파일 삭제 성공');
        return fs.rmdir('./folder');
        //fs.rmdir(경로, 콜백): 폴더를 지운다. 폴더 안에 파일이 있으면 에러 발생, 파일이 있는지 먼저 check해야한다.
    })
    .then(() => {
        console.log('폴더 삭제 성공');
    })
    .catch((err) => {
        console.error(err);
    });
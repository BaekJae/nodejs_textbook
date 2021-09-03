const fs = require('fs').promises;

fs.writeFile('./writeme.txt', '글이 입력됩니다.')
    .then(() => {
        return fs.readFile('./writeme.txt'); //Echo - readFile메서드로 글을 읽어냄
    })
    .then((data) => {
        console.log(data.toString());
    })
    .catch((err) => {
        console.error(err);
    });
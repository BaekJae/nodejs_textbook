const fs = require('fs').promises;

setInterval(() => {
    fs.unlink('./abcdefg.js')
}, 1000);
//버전에 따라 알아서 처리하는 동작이 바뀔 가능성 존재
//항상 catch를 붙이는 것을 권장한다.
const fs = require('fs');

const writeStream = fs.createWriteStream('./writeme2.txt');
//createWriteStream -> 첫 번째 인수는 출력 파일명, 두 번째 인수는 옵션

writeStream.on('finish', ()=>{
    console.log('파일 쓰기 완료');
});
//파일 쓰기가 종료되면 finish이벤트 리스너에 의해 콜백함수가 호출된다.

writeStream.write('이 글을 씁니다.\n');
writeStream.write('한번 더 씁니다.');
//write메서드로 넣을 데이터를 쓴다. 여러 번 호출 가능

writeStream.end();
//end메서드로 종료를 알린다. 이 때 finish이벤트가 발생한다.
const EventEmitter = require('events');

const myEvent = new EventEmitter();
myEvent.addListener('event1', () => {
    console.log('이벤트 1');
});
myEvent.addListener('event2', () => {
    console.log('이벤트 2');
});
//addListener(이벤트명, 콜백) : on과 동일

myEvent.on('event2', () => {
    console.log('이벤트 2 추가');
});
//on(이벤트명, 콜백): 이벤트 이름과 이벤트 발생 시의 콜백 연결, 연결하는 동작을 이벤트 리스닝이라 부른다.
//이벤트 하나에 이벤트 여러 개를 달아줄 수 있다.

myEvent.once('event3', () => {
    console.log('이벤트 3');
}); //한 번만 실행됨
//once(이벤트명, 콜백): 한 번만 실행되는 이벤트 선언

myEvent.emit('event1'); //이벤트 호출
//emit(이벤트명): 이벤트를 호출하는 메서드, 이름을 인수로 넣으면 미리 등록해놓은 콜백 실행

myEvent.emit('event2'); //이벤트 호출

myEvent.emit('event3'); //이벤트 호출
myEvent.emit('event3'); //실행 안 됨

myEvent.on('event4', () => {
    console.log('이벤트 4');
});
myEvent.removeAllListeners('event4');
//removeAllListeners(이벤트명): 이벤트명에 연결된 모든 리스너 제거
myEvent.emit('event4'); //실행 X

const listener = () => {
    console.log('이벤트 5');
};
myEvent.on('event5',listener);
myEvent.removeListener('event5', listener);
//removeListener(이벤트명, 리스너): 이벤트에 연결된 리스너를 하나씩 제거한다. 리스너를 반드시 넣어야 한다.
//off(이벤트명,리스너): 노드10에서 추가된 메서드, removeListener와 기능이 동일하다.
myEvent.emit('event5'); //실행 안 됨

console.log(myEvent.listenerCount('event2'));
//listenerCount(이벤트명): 현재 리스너가 몇 개 연결되어 있는지 확인
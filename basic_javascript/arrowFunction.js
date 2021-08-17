var relationship1 = { // 각자 다른 함수 스코프, 상위 this를 that이라는 변수를 이용해 가져옴
    name: 'zero',
    friends: ['nero', 'hero', 'xero'],
    logFriends: function(){
        var that = this; // relationship1을 가리키는 this
        this.friends.forEach(function (friend){ // 순회문
           console.log(that.name, friend); 
        });
    },
};
relationship1.logFriends();

const relationship2 = { //화살표 함수를 이용하여 스코프를 상속받음, 따라서 그대로 this로 사용 가능
    name: 'zero',
    friends: ['nero', 'hero', 'xero'],
    logFriends(){
        this.friends.forEach(friend => {
            console.log(this.name, friend);
        });
    },
};
relationship2.logFriends();
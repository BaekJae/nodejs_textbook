//async,await
//await에 의해, 해당 함수가 완료될 때까지 대기한다
//오류 처리는 try catch문
/*function findAndSaveUser(Users){
    Users.findOne({})
        .then((user) => {
            user.name = 'zero';
            return user.save();
        })
        .then((user)=>{
            return Users.findOne({gender:'m'});
        })
        .then((user) => {
            //생략
        })
        .catch(err => {
            console.error(err);
        });
}*/ //Promise로 만들어진 함수, async/await을 통해 아래와 같은 함수로 축약 가능

//async,await 기본형
/*async function findAndSaveUser(Users){
    try {
        let user = await Users.findOne({});
        user.name = 'zero';
        user = await user.save();
        user = await Users.findOne({gender: 'm'});
        //생략
    } catch(error){
        console.error(error);
    }
} //async,await의 경우 주로 데이터베이스를 접속하여 DATA LOAD, 함수 처리 결과를 반드시 활용해야 하는 경우 활용 */

//Arrowfunction 사용
/*const findAndSaveUser = async (Users) => {
    try{
        let user = await Users.findOne({});
        user.name = 'zero';
        user = await user.save();
        user = await Users.findOne({gender: 'm'});
        //생략
    } catch(error){
        console.log(error);
    }
};*/

//for와 async,await을 같이 써서 프로미스 순차실행 가능(Node10부터 지원하는 ES2018)
const promise1 = Promise.resolve('성공1');
const promise2 = Promise.resolve('성공2');
(async ()=>{
    for await (promise of [promise1, promise2]){
        console.log(promise);
    }
})();
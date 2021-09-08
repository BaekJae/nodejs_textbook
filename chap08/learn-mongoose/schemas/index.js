const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const connect = () => {
    if(process.env.NODE_ENV !== 'production'){
        mongoose.set('debug', true);
    }
    //mongoose6기준, useNewUrlParser와 useCreateIndex가 기본값 true로 항시 적용되어 저 옵션을 적용할 필요가 없다.
    //useUnifiedTopology 옵션은 항상 true, useFindandModify 옵션은 항상 false
    //옵션으로 해당 항목을 조작할 수 없다.
    mongoose.connect(process.env.MONGODB_URL, {
        dbName: process.env.dbName,
    }, (error) => {
        if(error) {
            console.log('몽고디비 연결 에러', error);
        } else{
            console.log('몽고디비 연결 성공');
        }
    });
};
mongoose.connection.on('error', (error) => {
    console.error(error);
});
mongoose.connection.on('disconnected', () => {
    console.error('몽고디비 연결이 끊겼습니다. 연결을 재시도합니다.');
    connect();
});

module.exports = connect;
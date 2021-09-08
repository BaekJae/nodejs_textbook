const mongoose = require('mongoose');

const { Schema } = mongoose;
//Schema 생성자를 이용해 스키마를 만든다. 필드를 각각 정의한다.
//_id는 기본키로 생성됨. 따로 적어줄 필요가 없다.
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    age: {
        type: Number,
        required: true,
    },
    married: {
        type: Boolean,
        required: true,
    },
    comment: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('User', userSchema);
const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
    //static init 메서드 -> 테이블에 대한 설정
    //static associate 메서드 -> 다른 모델과의 관계
    static init(sequelize){
        //super.init()
        //첫 번째 인수가 테이블 컬럼에 대한 설정, 두 번째 인수가 테이블 자체에 대한 설정
        return super.init({
            name: {
                type: Sequelize.STRING(20),
                allowNull: false,
                unique: true,
            },
            age: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
            },
            married: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
            },
            comment: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            },
        },
            //sequelize: static init메서드의 매개변수와 연결되는 옵션, db.sequelize객체를 넣는다. model/index.js에서 연결
            //timestamps: true면 cratedAt과 updatedAt컬럼을 추가, 로우가 생성될 때와 수정될 때의 시간이 자동 입력
            //해당 코드에서는 created_at 컬럼을 만들었으므로 timestamps속성이 필요하지 않다.
            //underscored: 테이블명과 컬럼명을 캐멀 케이스(기본값) 표기법에서 스네이크 케이스 표기법으로 만든다.
            //modelName: 모델 이름 설정, 노드 프로젝트에서 사용
            //tableName: 데이터베이스의 이름. 모델 이름을 소문자 및 복수형으로 만든다.
            //paranoid: 로우의 복원을 위해 true로 설정
            //true라면 deletedAt이라는 컬럼 생성, 로우를 삭제하면 완전히 삭제되지는 않고 deletedAt에 지운 시각이 기록된다.
            //조회 명령을 내릴 때도 deletedAt이 null인 로우를 조회한다.
            //charset과 collate: 각각 utf8과 utf8_general_ci로 설정해야 한글 입력
            //이모티콘까지 입력할 수 있게 하려면 utf8mb4와 utf8mb4_general_ci를 입력
            {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'User',
            tableName: 'users',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
    static associate(db) {
        //users테이블의 로우 하나를 불러올 때 comments테이블의 로우들도 같이 불러올 수 있다.
        db.User.hasMany(db.Comment, { foreignKey: 'commenter', sourceKey: 'id' });
    }
};
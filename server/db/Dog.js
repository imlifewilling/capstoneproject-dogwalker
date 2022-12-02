const conn = require('./conn');
const { STRING, UUID, UUIDV4, TEXT, INTEGER } = conn.Sequelize;

const Dog = conn.define('dog', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  nickname: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  age_year: {
    type: INTEGER
  },
  age_month: { //we won't use it in frontend
    type: INTEGER
  },
  gender: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  weight: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  breed: {
    type: STRING
  },
  dogDescription: {
    type: TEXT
  },
  avatar: {
    type: TEXT,
    get: function(){
      const prefix = 'data:image/png;base64,';
      const data = this.getDataValue('avatar');
      if(!data){
        return data;
      }
      if(data.startsWith(prefix)){
        return data;
      }
      return `${prefix}${data}`;
    }
  }
});

module.exports = Dog;


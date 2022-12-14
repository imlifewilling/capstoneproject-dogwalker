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
    defaultValue: '',
    get: function () {
      const prefixPNG = 'data:image/png;base64,';
      const prefixJPG = 'data:image/jpeg;base64,';
      const data = this.getDataValue('avatar') || '';
      if (data.startsWith(prefixPNG)) {
        return data;
      } else if (data.startsWith(prefixJPG)) {
        return data;
      } else if (!data) {
        return null;
      }
      return `${prefixPNG}${data}`;
    },
  }
});

module.exports = Dog;


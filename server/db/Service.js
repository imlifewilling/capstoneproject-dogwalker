const conn = require('./conn');
const { STRING, UUID, UUIDV4, TEXT, INTEGER } = conn.Sequelize;

const Service = conn.define('service', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  task: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  serviceDescription: {
    type: TEXT
  },
  availability: {
    type: STRING
  },
  serviceDogsize: {
    type: STRING
  },
  price: {
    type: INTEGER,
  }
});

module.exports = Service;


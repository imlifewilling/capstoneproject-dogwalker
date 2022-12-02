const conn = require('./conn');
const { BOOLEAN, UUID, UUIDV4, TEXT, INTEGER } = conn.Sequelize;

const ServiceEvent = conn.define('serviceevent', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  startHour: {
    type: INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  startMinute: {
    type: INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  duration: {
    type: INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  isCompleted: {
    type: BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
});

module.exports = ServiceEvent;


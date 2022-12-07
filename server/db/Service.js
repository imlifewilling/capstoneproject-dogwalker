const conn = require('./conn');
const { STRING, UUID, UUIDV4, TEXT, INTEGER, ENUM, DECIMAL, ARRAY } = conn.Sequelize;

const Service = conn.define('service', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  task: {
    type: ARRAY(ENUM(['Dog Walking', 'House Sitting', 'Dog Day Care'])),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  serviceDescription: {
    type: TEXT
  },
  availability: {
    type: ENUM(['Morning', 'Afternoon', 'Evening', 'Before Dark', 'Any Time'])
  },
  serviceDogsize: {
    type: ENUM(['Any Size', 'Small', 'Medium', 'Large', 'Giant'])
  },
  price: {
    type: DECIMAL(10,2),
  }
});

module.exports = Service;


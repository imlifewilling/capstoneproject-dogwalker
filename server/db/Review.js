const conn = require('./conn');
const { UUID, UUIDV4, INTEGER, TEXT} = conn.Sequelize;

const Review = conn.define('review', {
    id: {
        type: UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    star: {
        type: INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
            min: 1,
            max: 5,
        }
    },
    comment: {
        type: TEXT,
        allowNull: true,
    },
    walkerId: {
        type: UUID,
        allowNull: false,
        validate:{
            notEmpty:true
        }
    }
});

module.exports = Review;
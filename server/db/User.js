const conn = require('./conn');
const { STRING, UUID, UUIDV4, TEXT, BOOLEAN } = conn.Sequelize;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT = process.env.JWT;


const User = conn.define('user', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  firstname: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  lastname: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  password: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  email: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    },
    unique: true
  },
  address: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  phone: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  userDescription: {
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
  },
  isWalker: {
    type: BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

//hash he password before saving user info into db
User.addHook('beforeSave', async(user)=> {
  if(user.changed('password')){
    user.password = await bcrypt.hash(user.password, 5);
  }
});

//generateToken for user
User.prototype.generateToken = function(){
  return jwt.sign({ id: this.id }, JWT);
};

//find user and return token
User.authenticate = async function({ email, password }){
  const user = await this.findOne({
    where: {
      email 
    }
  });
  if(user && await bcrypt.compare(password, user.password)){
    return jwt.sign({ id: user.id }, JWT);
  }
  const error = new Error('bad credentials');
  error.status = 401;
  throw error;
}

//find out the user by token
User.findByToken = async function(token){
  try {
    const { id } = jwt.verify(token, process.env.JWT);
    const user = await this.findByPk(id);
    if(user){
      return user;
    }
    throw 'user not found';
  }
  catch(ex){
    const error = new Error('bad credentials');
    error.status = 401;
    throw error;
  }
}




module.exports = User;


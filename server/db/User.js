const conn = require('./conn');
const { STRING, UUID, UUIDV4, TEXT, BOOLEAN, ARRAY } = conn.Sequelize;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT = process.env.JWT;
const axios = require('axios');


const User = conn.define('user', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  firstname: {
    type: STRING
  },
  lastname: {
    type: STRING
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
    type: STRING
  },
  latlng: {
    type: ARRAY(STRING),
    defaultValue: []
  },
  phone: {
    type: STRING
  },
  userDescription: {
    type: TEXT
  },
  avatar: {
    type: TEXT,
    defaultValue: '',
    get: function () {
      const prefixPNG = 'data:image/png;base64,';
      const prefixJPG = 'data:image/jpeg;base64,';
      const data = this.getDataValue('avatar') || '';
      if(data.startsWith('http')){
        return data
      }
      else if (data.startsWith(prefixPNG)) {
        return data;
      } else if (data.startsWith(prefixJPG)) {
        return data;
      } else if (!data) {
        return null;
      }
      return `${prefixPNG}${data}`;
    },
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

User.authgoogle = async function (userinfo) {
  let user = await User.findOne({
    where: {
      email: userinfo.email,
    },
  });
  if (!user) {
    user = await User.create(userinfo);
  }
  // console.log(jwt.sign({id: user.id}, JWT))
  return jwt.sign({ id: user.id }, JWT);
};


const GITHUB_TOKEN_URL = 'https://github.com/login/oauth/access_token';
const GITHUB_USER_URL = 'https://api.github.com/user';
User.authgithub = async function (code) {
  
  let response = await axios.post(
    GITHUB_TOKEN_URL,
    {
      code,
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
    },
    {
      headers: {
        accept: 'application/json',
      },
    }
  );

  const { access_token } = response.data;
  if (!access_token) {
    return response.data;
  }
  response = await axios.get(GITHUB_USER_URL, {
    headers: {
      authorization: `Bearer ${access_token}`,
    },
  });
 
  const userinfo = {
    email: response.data.email,
    password: response.data.node_id,
    avatar: response.data.avatar_url,
    firstname: response.data.name
  }

 
  let user = await User.findOne({
    where: {
      email: userinfo.email
    },
  });
  if (!user) {
    user = await User.create(userinfo);
  }
  return { token: jwt.sign({ id: user.id }, JWT), id: user.id };
};


module.exports = User;


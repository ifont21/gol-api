const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcryptjs');
const Player = require('../../../services/players/models/player');

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      minlength: 1
    },
    password: {
      type: String,
      required: true,
      minlength: 6
    },
    tokens: [
      {
        access: {
          type: String,
          required: true
        },
        token: {
          type: String,
          required: true
        }
      }
    ]
  }
);

UserSchema.plugin(uniqueValidator);

UserSchema.methods.toJSON = function () {
  let user = this;
  let userObject = user.toObject();
  return _.pick(userObject, ['_id', 'email']);
}

UserSchema.methods.generateAuthToken = async function () {
  let user = this;
  let access = 'auth';
  let response;

  let token = jwt.sign({ _id: user._id.toHexString(), access }, 'abc123').toString();
  user.tokens.push({ access, token });

  try {
    response = await user.save();
  } catch (error) {
    throw new Error(error);
  }

  return token;
}

UserSchema.methods.removeToken = function (token) {
  let user = this;
  
  return user.update({
    $pull: {
      tokens: { token }
    }
  });
}

UserSchema.statics.findByToken = async function (token) {
  let User = this;
  let decoded, user;

  try {
    decoded = jwt.verify(token, 'abc123');
  } catch (err) {
    throw new Error(err);
  }

  try {
    user = await User.findOne(
      {
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
      });
  } catch (error) {
    throw new Error(error);
  }

  return user;
}

UserSchema.statics.findByCredentials = async function (email, password) {
  let User = this;
  const user = await User.findOne({ email });
  if (user) {
    const pass = await bcrypt.compare(password, user.password);
    if (pass) {
      return user;
    } else {
      return null;
    }
  } else {
    return null;
  }

}

UserSchema.pre('save', function (next) {
  var user = this;

  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

UserSchema.post('save', async function (user, next) {
  let response;
  const userAlready = await Player.findOne({ user: user.id });
  if (!userAlready) {
    const player = new Player({
      name: user.email,
      user: user.id
    });
    try {
      response = await player.save();
    } catch (err) {
      throw new Error(err);
    }
  } else {
    next();
  }
});

module.exports = mongoose.model('User', UserSchema);
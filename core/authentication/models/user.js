const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const uniqueValidator = require('mongoose-unique-validator');

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

module.exports = mongoose.model('User', UserSchema);
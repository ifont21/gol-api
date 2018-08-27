const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      unique: true
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

module.exports = mongoose.model('User', UserSchema);
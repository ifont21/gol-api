const wrap = require('../exceptions/error-catcher');
const User = require('./models/user');
const _ = require('lodash');

const signUp = () =>
  wrap(async (req, res) => {
    let response;
    let token;
    const item = req.body;
    const user = new User(item);

    response = await user.save();

    if (response) {
      token = await user.generateAuthToken();
      res.header('x-auth', token).json(user);
    }
  });

const user = () =>
  wrap(async (req, res) => {
    res.json(req.user);
  });


const signIn = () =>
  wrap(async (req, res) => {
    let user, token;
    let body = _.pick(req.body, ['email', 'password']);
    user = await User.findByCredentials(body.email, body.password);
    if (!user) {
      return res.status(400).json({ message: 'Unauthorized' });
    }
    token = await user.generateAuthToken();
    res.header('x-auth', token).json(user);

  });

const logOut = () =>
  wrap(async (req, res) => {
    debugger;
    const response = await req.user.removeToken(req.token);
    if (response) {
      res.status(200).json();
    } else {
      res.status(400).json();
    }
  });

module.exports = {
  signUp,
  signIn,
  user,
  logOut
}
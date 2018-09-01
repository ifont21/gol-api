const wrap = require('../exceptions/error-catcher');
const User = require('./models/user');

const signUp = () =>
  wrap(async (req, res) => {
    let response;
    let token;
    const item = req.body;
    const user = new User(item);

    response = await user.save();

    if (response) {
      token = await user.generateAuthToken();
      res.header('x-auth', token).send(user);
    }
  });

const user = () =>
  wrap(async (req, res) => {
    res.json(req.user);
  });

module.exports = {
  signUp,
  user
}
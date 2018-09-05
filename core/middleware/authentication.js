const User = require('../authentication/models/user');

const authenticate = async (req, res, next) => {
  debugger;
  let token = req.header('x-auth');
  let user;

  user = await User.findByToken(token);

  if (!user) {
    return res.status(400).send();
  }
  req.user = user;
  req.token = token;
  next();
}

module.exports = {
  authenticate
}
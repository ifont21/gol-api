const User = require('../authentication/models/user');

const authenticate = async (req, res, next) => {
  let token = req.header('x-auth');
  let user;

  try {
    user = await User.findByToken(token);
  } catch (error) {
    res.status(400).json({});
  }

  if (!user) {
    res.status(400).json({});
  }
  req.user = user;
  req.token = token;
  next();
}

module.exports = {
  authenticate
}
const express = require('express');
const authenticationController = require('./authentication.controller');
const { authenticate } = require('../middleware/authentication');
const router = express.Router();

router.post(
  '/users/signup',
  authenticationController.signUp()
)

router.post(
  '/users/signin',
  authenticationController.signIn()
)

router.get(
  '/users/me',
  authenticate,
  authenticationController.user()
);

router.delete(
  '/users/me/token',
  authenticate,
  authenticationController.logOut()
)

module.exports = router;
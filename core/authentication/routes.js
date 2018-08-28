const express = require('express');
const authenticationController = require('./authentication.controller');
const { authenticate } = require('../middleware/authentication');
const router = express.Router();

router.post(
  '/users/signup',
  authenticationController.signUp()
)

router.get(
  '/users/me',
  authenticate,
  authenticationController.user()
)

module.exports = router;
const express = require('express');
const authenticationController = require('./authentication.controller');
const router = express.Router();

router.post(
    '/user/signup',
    authenticationController.signUp()
)

module.exports = router;
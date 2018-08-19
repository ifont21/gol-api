const express = require('express');
const playerController = require('./players/player.controller');
const router = express.Router();

router.get(
    '/players',
    playerController.getAll()
)

router.post(
    '/players',
    playerController.post()
)

module.exports = router;
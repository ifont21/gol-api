const express = require('express');
const playerController = require('./players/player.controller');
const eventController = require('./events/event.controller');
const router = express.Router();

router.get(
    '/players',
    playerController.getAll()
)

router.post(
    '/players',
    playerController.post()
)

router.get(
    '/events',
    eventController.getAll()
);

router.post(
    '/events',
    eventController.post()
)

router.put(
    '/events/:eventId/players/:playerId',
    eventController.processPlayerToEvent()
)

module.exports = router;
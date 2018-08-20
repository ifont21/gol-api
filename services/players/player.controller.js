const wrap = require('../../core/exceptions/error-catcher');
const Player = require('../players/models/player');

const getAll = () =>
  wrap(async (req, res) => {
    const players = await Player.find();
    res.json(players);
  });

const post = () =>
  wrap(async (req, res) => {
    let response;
    const item = req.body;
    const auditory = {
      dt_created: Date.now(),
      dt_updated: Date.now(),
      created_by: 'userFake',
      updated_by: 'userFake',
    }
    const player = new Player({
      ...item,
      auditory
    });
    try {
      response = await player.save();
    } catch (err) {
      res.status(500).json(err);
    }
    res.json(response);
  });


module.exports = {
  getAll,
  post
}
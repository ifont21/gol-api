const wrap = require('../../core/exceptions/error-catcher');
const Player = require('../players/models/player');

const getAll = () =>
  wrap(async (req, res) => {
    const players = await Player.find()
      .populate('user');
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

    response = await player.save();

    res.json(response);
  });


module.exports = {
  getAll,
  post
}
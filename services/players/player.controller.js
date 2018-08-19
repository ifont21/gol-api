const wrap = require('../../core/exceptions/error-catcher');
const Player = require('../players/models/player');

const getAll = () =>
  wrap(async (req, res) => {
    Player
      .find()
      .then(
        (players) => {
          res.json(players);
        },
        (err) => {
          res.status(500).send(err);
        });
  });

const post = () =>
  wrap(async (req, res) => {
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
    player
      .save()
      .then(
        (response) => {
          res.json(response);
        },
        (err) => {
          res.status(500).send(err);
        }
      );
  });


module.exports = {
  getAll,
  post
}
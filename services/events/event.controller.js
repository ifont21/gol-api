const wrap = require('../../core/exceptions/error-catcher');
const Event = require('./models/event');
const Player = require('../players/models/player');
const { ObjectID } = require('mongodb');

const getAll = () =>
  wrap(async (req, res) => {
    const events = await Event
      .find()
      .populate('players');
    res.json(events);
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
    };
    if (item.owner) {
      if (!ObjectID.isValid(item.owner)) {
        return res.status(404).send('invalid id');
      }
    }
    const event = new Event({
      ...item,
      auditory
    });

    try {
      response = await event.save();
    } catch (err) {
      res.status(500).json(err);
    }
    res.json(response);
  });

const processPlayerToEvent = () =>
  wrap(async (req, res) => {
    let response;
    const playerId = req.params.playerId;
    const eventId = req.params.eventId;
    let adding = req.headers['adding'] || true;
    adding = typeof adding === 'string' ? adding === 'true' : adding;
    
    if (!ObjectID.isValid(eventId)) {
      return res.status(404).json({ error: 'invalid id' });
    }
    if (!ObjectID.isValid(playerId)) {
      return res.status(404).json({ error: 'invalid id' });
    }
    const event = await Event.findById(eventId);
    const player = await Player.findById(playerId);

    if (adding) {
      if (isExistingPlayer(event.players, playerId)) {
        return res.status(500).json({ error: 'Player already registered' });
      }

      if (exceedMaxPlayer(event.max_players, event.players.length)) {
        return res.status(500).json({ error: 'You have reached the max players top' });
      }
    }

    if (adding) {
      event.players.push(player);
    } else {
      event.players = removeItem(event.players, playerId);
    }

    try {
      response = await event.save();
    } catch (err) {
      res.status(500).json(err);
    }
    res.json(response);
  });


// ****************** UTIL FUNCTIONS ***********************************************************************

const isExistingPlayer = (players, playerId) => {
  const exist = players.filter(id => String(id) === playerId)[0];
  return exist;
}

const exceedMaxPlayer = (maxPlayers, length) => {
  return (length + 1) > maxPlayers;
}

const removeItem = (array, value) => {
  const stringArray = array.map(x => String(x));
  const index = stringArray.indexOf(value);
  if (index !== -1) {
    stringArray.splice(index, 1);
  }
  return stringArray;
}

// *********************** EXPORT METHODS ******************************************************************
module.exports = {
  processPlayerToEvent,
  getAll,
  post
};
const CronJob = require('cron').CronJob;
const Event = require('../services/events/models/event');


// const job = new CronJob('00 00 23 * * *', async function () {
//   const response = await renewDate();
// });

// job.start();

const getEvents = async () => {
  today = new Date();
  const eastDate = today.setHours(today.getHours() - 5);
  const from = new Date(eastDate);
  const to = new Date(eastDate);
  from.setHours(0);
  from.setMinutes(0);
  from.setSeconds(0);
  to.setHours(23);
  to.setMinutes(59);
  to.setSeconds(59);
  const events = await Event.find({ dt_event: { $gte: from, $lte: to } });
  debugger;
  return events;
}

const renewDate = async () => {
  console.log(`renew Date method *********`);
  let response;
  console.log(`fetch events *********`);
  const events = await getEvents();
  if (!events.length) {
    console.log(`empty events *********`);
    return;
  }
  const dtEvent = events[0].dt_event;
  const newDate = new Date(dtEvent);
  newDate.setDate(newDate.getDate() + 7);
  try {
    console.log(`update events *********`);
    response = await Event.update({ _id: events[0]._id }, { $set: { dt_event: newDate } });
  } catch (err) {
    throw new Error(err);
  }
}
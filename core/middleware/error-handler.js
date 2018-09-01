const AbortedRequestError = require('../exceptions/aborted-request-error');
const ApiException = require('../exceptions/api-exception');


module.exports = () => (err, req, res, next) => {
  if (err instanceof AbortedRequestError) {
    next();
  } else if (err instanceof ApiException) {
    const errorCode = err.status || 400;
    res.status(errorCode).json({ message: err.message });
  } else {
    res.status(500).json({ message: err.message });
  }
};

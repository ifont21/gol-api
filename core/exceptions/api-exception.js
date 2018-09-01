class ApiException extends Error {
    constructor(message, status) {
      super();
      this.message = message;
      this.stack = message ? message.stack : undefined;
      this.status = status || 400;
    }
  }
  
  module.exports = ApiException;
  
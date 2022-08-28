function BadRequestError(message) {
  this.name = 'BadRequestError';
  this.message = message;
}

BadRequestError.prototype = Error;

module.exports = {
  BadRequestError,
};

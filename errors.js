class BadRequestError extends Error {
  constructor() {
    super();

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, BadRequestError);
    }

    this.name = 'BadRequestError';
  }
}

module.exports = {
  BadRequestError,
};

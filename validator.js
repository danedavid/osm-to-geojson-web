const { validationResult } = require('express-validator');
const validations = require('./validations');

// Middleware to validate request payload/query params
const validator = async (req, res, next) => {
  // Fetch & run validations for current path
  const currentValidations = validations[req.path]?.[req.method] || [];

  for (const validation of currentValidations) {
    const errors = await validation.run(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  }

  next();
};

module.exports = validator;

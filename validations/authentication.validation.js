const Joi = require('joi');

const logInValidation = (req, res, next) => {
  const schema = Joi.object({
    userName: Joi.string().required(),
    password: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({
      status: false,
      message: error.details[0].message.replace(/"/g, ''),
    });
  }

  return next();
};

module.exports = {
  logInValidation,
};

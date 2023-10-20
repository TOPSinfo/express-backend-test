const Joi = require('joi');

const getLocusValidation = (req, res, next) => {
  const schema = Joi.object({
    id: Joi.number().valid(0, 1).optional(),
    assemblyId: Joi.number().valid(0, 1).optional(),
    pageSize: Joi.number().integer().min(1).optional(),
    currentPage: Joi.number().integer().min(1).optional(),
    regionId: Joi.number().valid(0, 1).optional(),
    sideLoading: Joi.number().valid(0, 1).optional(),
    sortBy: Joi.string().valid('locusName', 'publicLocusName').optional(),
    Authorization: Joi.string().optional()
  });

  const { error } = schema.validate(req.query);

  if (error) {
    return res.status(400).json({
      status: false,
      message: error.details[0].message.replace(/"/g, ''),
    });
  }

  return next();
};

module.exports = {
  getLocusValidation,
};

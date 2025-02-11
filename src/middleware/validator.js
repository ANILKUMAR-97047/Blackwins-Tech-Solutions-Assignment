const Joi = require('joi');
const { errorResponse } = require('../utils/response.util');

const contactSchema = Joi.object({
    name: Joi.string().required().min(2).max(100),
    email: Joi.string().required().email(),
    phoneNumber: Joi.string().required().pattern(/^\+?[\d\s-]{10,}$/),
    address: Joi.string().allow('', null)
});

exports.validateContact = (req, res, next) => {
    const { error } = contactSchema.validate(req.body);
    if (error) {
        return errorResponse(res, 400, error.details[0].message);
    }
    next();
};
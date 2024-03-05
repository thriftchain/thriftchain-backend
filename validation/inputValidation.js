const Joi = require('joi');

function validateInput(data) {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required()
    });

    return schema.validate(data);
}

module.exports = {
    validateInput,
};

const Joi = require('joi');

const mangaValidate = (manga) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        author: Joi.string().min(6).required(),
        type: Joi.string().min(7).required(),
        price: Joi.number().integer().min(10000).required()
    });

    console.log(schema.validate(manga));
    return schema.validate(manga);
}

const registerValidate = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(6).required(),
        email: Joi.string().email().min(10).required(),
        password: Joi.string().min(6).required()
    });

    return schema.validate(data);
}

const loginValidate = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().min(10).required(),
        password: Joi.string().min(6).required()
    })

    return schema.validate(data);
}

module.exports = {mangaValidate, registerValidate, loginValidate};
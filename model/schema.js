import joi from 'joi';

const object = joi.object({
    name: joi.string()
        .alphanum()
        .min(1)
        .max(20)
        .required(),

    desc: joi.string()
        .min(1)
        .max(100)
        .required()
})

const schemaValidation = ((body) => {
    return object.validate(body)
});

export default schemaValidation;

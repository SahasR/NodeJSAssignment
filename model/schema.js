const joi = require('joi');

const schema = {
    object: joi.object({
        name: joi.string()
            .alphanum()
            .min(1)
            .max(20)
            .required(),
    
        desc: joi.string()
            .min(1)
            .max(100)
            .required()
    }),
    schemaValidation : function(body){
        return this.object.validate(body)
    }
}

module.exports = schema;

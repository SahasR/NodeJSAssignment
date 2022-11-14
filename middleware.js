const schema = require('./model/schema');
//Middleware Object to contain all the middleware functions.
const middleware = {
    validateToken: function(req, res, next){
        if (req.headers.token === 'secretpass'){
            next();
        } else {
            res.statusCode = 403;
            res.send("Access Forbidden!");
        }
    },
    validateBody : function(req, res, next) {
        let validation = schema.schemaValidation(req.body)
        if (typeof validation.error !== 'undefined') {
            req.validatedBody = false;
        } else {
            req.validatedBody = true;
        }
        next();
    },
    validateID : function(req, res, next) {
        let id = parseInt(req.params.id, 10);
        if (typeof id === 'number'){
            if (id >= 0 && id < tasksList.length){
                req.validatedID = true;
            } else {
                req.validatedID = false;
            }
        }
        next();
    }
}

module.exports = middleware;
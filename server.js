const express = require('express');
const bodyParser = require('body-parser');
const joi = require('joi');

const app = express();
const jsonParser = bodyParser.json();
const schema = joi.object({
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

var tasksList = [];

app.listen(3000, function() {
    console.log('Listening on http://localhost:3000/')
})

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
        let validation = schema.validate(req.body)
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

//Another piece of middleware we want to run to get the bodys to parse.
app.use(jsonParser);

app.get('/', (req, res) => {
    res.send("Hello use the proper urls to perform functions on the server!");
})

// GET /tasks to fetch all the tasks
app.get('/tasks', middleware.validateToken ,(req, res) => {
    res.json(tasksList);
})

// POST /task to post a new task
app.post('/tasks', [middleware.validateToken, middleware.validateBody], (req, res) => {
    let validation = req.validatedBody;
    if (validation === true){
        res.statusCode = 200;
        res.send("Added!");
        tasksList.push(req.body);
    } else {
        res.statusCode = 405;
        res.send("Illegal Object!");
    }
})

// GET /task/id to fetch a particular task
app.get('/task/:id', [middleware.validateToken, middleware.validateID], (req, res) => {
    let validation = req.validatedID;
    if (validation === true){
        res.statusCode = 200;
        res.send(tasksList[req.params.id])
    } else {
        res.statusCode = 405;
        res.send("Illegal Value");
    }
})

// DELETE /task/id to delete a particular task
app.delete('/task/:id', [middleware.validateToken, middleware.validateID], (req, res) => {
    let validation = req.validatedID;
    if (validation === true){
        let id = req.params.id;
        tasksList.splice(id, 1);
        res.statusCode = 200;
        res.send("Deleted!");
    } else {
        res.statusCode = 404;
        res.send("Not found index?");
    }
})

// PUT /task/id to update a particular task
app.put('/task/:id', [middleware.validateToken, middleware.validateBody, middleware.validateID], (req, res) => {
    let validationID = req.validatedID;
    let validationBody = req.validatedBody;
    if (validationBody === true && validationID === true){
        tasksList[req.params.id] = req.body;
        res.statusCode = 200;
        res.send("Updated Successfully!");
    } else {
        res.statusCode = 405;
        res.send("Problem with either index or object");
    }
})




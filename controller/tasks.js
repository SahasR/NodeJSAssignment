import tasksList from "../data/tasklist.js";

// GET /tasks to fetch all the tasks
const returnList = ((req, res) => {
    return res.json(tasksList);
})

// GET / returns the index page with a simple message
const returnIndex = ((req, res) => {
    res.send("Hello use the proper urls to perform functions on the server!");
})

// POST /task to post a new task
const addTask = ((req, res) => {
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
const getTask = ((req, res) => {
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
const deleteTask = ((req, res) => {
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
const updateTask = ((req, res) => {
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

export {returnIndex, returnList, addTask, getTask, deleteTask, updateTask}
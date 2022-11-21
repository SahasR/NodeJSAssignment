import taskList from "../data/tasklist.js";

// GET /tasks to fetch all the tasks
const returnList = ((req, res) => {
    return res.json(taskList.tasksList);
})

// GET / returns the index page with a simple message
const returnIndex = ((req, res) => {
    res.json("Hello use the proper urls to perform functions on the server!");
})

// POST /task to post a new task
const addTask = ((req, res) => {
    let validation = req.validatedBody;
    if (validation === true){
        res.statusCode = 200;
        taskList.count++;
        let addObj = Object.assign({id : taskList.count}, req.body)
        taskList.tasksList.push(addObj);
        res.json(addObj);
    } else {
        res.statusCode = 405;
        res.json("Illegal Object!");
    }
})


// GET /task/id to fetch a particular task
const getTask = ((req, res) => {
    let validation = req.validatedID;
    let found = false;
    if (validation === true){
       taskList.tasksList.map((task) => {
            if (task.id === parseInt(req.params.id, 10)){
                found = true;
                res.statusCode = 200;
                res.json(task);
            }
       })
       if (found === false){
        res.statusCode = 404;
        res.json("Task not found!");
       }
    } else {
        res.statusCode = 404;
        res.json("Illegal Value");
    }
})

// DELETE /task/id to delete a particular task
const deleteTask = ((req, res) => {
    let validation = req.validatedID;
    if (validation === true){
        let found = false;
        let foundind;
        taskList.tasksList.map((task, i) => {
            if (task.id === parseInt(req.params.id, 10)){
                found = true;
                foundind = i;
            }
       })

       if (found === false){
        res.statusCode = 404;
        res.json("Task not found!");
       } else {
        taskList.tasksList.splice(foundind, 1);
        res.statusCode = 200;
        res.json("Deleted!");
       }
    } else {
        res.statusCode = 404;
        res.json("Not found index?");
    }
})

// PUT /task/id to update a particular task
const updateTask = ((req, res) => {
    let validationID = req.validatedID;
    let validationBody = req.validatedBody;
    if (validationBody === true && validationID === true){
        let found = false;
        let foundind;
        taskList.tasksList.map((task, i) => {
            if (task.id === parseInt(req.params.id, 10)){
                found = true;
                foundind = i;
            }
       })

       if (found === false){
        res.statusCode = 404;
        res.json("Task not found!");
       } else {
        taskList.tasksList[foundind] = Object.assign({id : parseInt(req.params.id, 10)}, req.body);
        res.statusCode = 200;
        res.json("Updated Successfully!");
       }

    } else {
        res.statusCode = 405;
        res.json("Problem with either index or object");
    }
})

export {returnIndex, returnList, addTask, getTask, deleteTask, updateTask}
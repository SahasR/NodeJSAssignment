import middleware from '../middleware.js';
import express from 'express';
import {returnIndex, returnList, addTask, getTask, updateTask, deleteTask} from '../controller/tasks.js'

const router = express.Router();

router.get('/', middleware.validateToken, returnIndex);

// GET /tasks to fetch all the tasks
router.get('/tasks', middleware.validateToken, returnList);

// POST /task to post a new task
router.post('/tasks', [middleware.validateToken, middleware.validateBody], addTask);

// GET /task/id to fetch a particular task
router.get('/task/:id', [middleware.validateToken, middleware.validateID], getTask);

// DELETE /task/id to delete a particular task
router.delete('/task/:id', [middleware.validateToken, middleware.validateID], deleteTask);

// PUT /task/id to update a particular task
router.put('/task/:id', [middleware.validateToken, middleware.validateBody, middleware.validateID], updateTask);

export default router;
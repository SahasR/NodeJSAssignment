import express from 'express';
import bodyParser from 'body-parser';
import task_routes from './routes/tasks.js';
import cors from 'cors';

const app = express();
const jsonParser = bodyParser.json();

app.listen(3001, function() {
    console.log('Listening on http://localhost:3001/')
})

//Another piece of middleware we want to run to get the bodys to parse.
app.use(cors());
app.use(jsonParser);
app.use('/', task_routes);
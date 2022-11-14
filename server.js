import express from 'express';
import bodyParser from 'body-parser';
import task_routes from './routes/tasks.js';

const app = express();
const jsonParser = bodyParser.json();

app.listen(3000, function() {
    console.log('Listening on http://localhost:3000/')
})

//Another piece of middleware we want to run to get the bodys to parse.
app.use(jsonParser);
app.use('/', task_routes);





import express from 'express';
import bodyParser from 'body-parser';
import task_routes from './routes/tasks.js';
import cors from 'cors';

const app = express();
const jsonParser = bodyParser.json();

var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}

app.listen(3001, function() {
    console.log('Listening on http://localhost:3001/')
})

//Another piece of middleware we want to run to get the bodys to parse.
app.use(cors(corsOptions));
app.use(jsonParser);
app.use('/', task_routes);
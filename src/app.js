const express = require('express');
const dotenv = require('dotenv').config();
const taskRouter = require('./routes/taskRouter');
const loginRouter = require("./routes/loginRouter");
const marcarLugar = require("./routes/marcadoresRouter");

const app = express();
app.set('port', process.env.PORT || 3005);

const cors = require('cors');
app.use(express.json());
app.use(cors());

app.use('/api', [
    taskRouter,
    loginRouter,
    marcarLugar
]);

module.exports = app;
const express = require('express')
const cookieParser = require('cookie-parser')
const app = express();
const { connectDb } = require('./database.js');
const todos = require('./routes/todo')
const user = require('./routes/user')
const error = require('./middleware/error.js');
const cors = require('cors');

connectDb();
app.use(express.json());
app.use(cookieParser());





app.use(cors());
app.use('/api/v1/', todos);
app.use('/api/v1', user);
app.use(error);
module.exports = app;
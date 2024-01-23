const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
// const answer = require('./routes/answer');
const questions = require('./routes/question');

const app = express();

// Middleware setup
app.use(express.json());
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());

// app.post('/api/create-order', orderController.newOrder);


// app.use('/api', answer);
app.use('/api', questions);


module.exports = app;

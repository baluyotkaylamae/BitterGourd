const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const questions = require('./routes/question');
const auth = require('./routes/auth');
const answer = require('./routes/answer');
const categories = require('./routes/categorypost');
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
app.use('/api', auth);
app.use('/api', answer);
app.use('/api', categories);

module.exports = app;

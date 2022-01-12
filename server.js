// Imports
const mongoose = require('mongoose');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(require('./routes'));

// Establish Mongoose connection
mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost:27017/pizza-hunt'
);

// Log Mongo
// Use this to log mongo queries being executed!
mongoose.set('debug', true);

app.listen(PORT, () => console.log(`Connected to localhost:${PORT}`));

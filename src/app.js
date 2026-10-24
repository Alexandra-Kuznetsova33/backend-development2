require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const routes = require('./routes');
const logger = require('./middlewares/logger');
const cors = require('./middlewares/cors');
const notFound = require('./middlewares/notFound');
const errorHandler = require('./middlewares/errorHandler');

const { PORT = 3005, MONGO_URL = 'mongodb://127.0.0.1:27017/mydb' } = process.env;
const app = express();

mongoose.connect(MONGO_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('MongoDB connection error:', err.message));

app.use(express.json()); 
app.use(logger);
app.use(cors);

app.use('/', routes);

app.use(notFound);

app.use(errorHandler);

// Запуск сервера
app.listen(PORT, '127.0.0.1', () => {
  console.log(`Server started on http://127.0.0.1:${PORT}`);
});
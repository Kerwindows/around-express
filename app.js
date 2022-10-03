const express = require('express');
const mongoose = require('mongoose');

const app = express();
mongoose.connect('mongodb://localhost:27017/aroundb');
app.use(express.json());

const usersRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

const { PORT = 3000 } = process.env;
// app.listen(PORT = 3000, () => {
//   // eslint-disable-next-line no-console
//   console.log('Server is Running');
// });

app.use((req, res, next) => {
  req.user = {
    _id: '633aa7a3e593d7786651c531',
  };
  next();
});

app.use('/users', usersRouter);
app.use('/cards', cardRouter);

app.use((req, res) => {
  res.status(404).send({ message: 'Requested resource not found' });
});

app.listen(PORT);

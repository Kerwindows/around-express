/* eslint-disable-next-line no-console */
const express = require('express');

const app = express();
const usersRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

// const { PORT = 3000 } = process.env;

// app.listen(PORT, () => {
//   console.log(`Listening on port ${PORT}`);
// });
app.use('/users', usersRouter);
app.use('/cards', cardRouter);

app.use((req, res) => {
  res.status(404).send({ message: 'Requested resource not found' });
});

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

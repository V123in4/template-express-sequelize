require('dotenv').config();

const express = require('express');
const todosRouter = require('./domains/todos/router');
const usersRouter = require('./domains/users/router');

const { CustomError } = require('./errors/customError');

const app = express();

app.use(express.json());

app.use('/v1/users', usersRouter);
app.use('/v1/todos', todosRouter);

app.all('*', function (req, res) {
  res.status(404).json({
    message: 'not found'
  });
});

// middleware error handler
app.use(async function (err, req, res, next) {
  console.error(err);

  if (err instanceof CustomError) {
    res.status(err.status).json({
      error: err.message,
      code: err.code
    });
  } else {
    res.status(500).json({
      error: 'internal server error'
    });
  }
});

app.listen(3002);

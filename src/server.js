require('dotenv').config();

const express = require('express');
const jwt = require('jsonwebtoken');

const userRouter = require('./domains/users/router');
const { CustomError } = require('./errors/customError');
const { asyncHandler } = require('./helpers/asyncHandler');
const { authenticated } = require('./middlewares/authenticated');

const app = express();

app.use(express.json());

app.use('/users', userRouter);

app.get('/protected', authenticated, asyncHandler(async function(req, res) {
  res.status(200).json({
    message: 'you are authenticated!'
  })
}));

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

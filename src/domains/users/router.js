const express = require('express');
const { CustomError } = require('../../errors/customError');
const { register, getUserByUsername } = require('./repository');
const { asyncHandler } = require('../../helpers/asyncHandler');
const jwt = require('jsonwebtoken');

const userRouter = express.Router();

userRouter.post('/register', async function (req, res) {
  await register(req.body.username, req.body.password);

  res.json({
    status: 'registered!'
  });
});

userRouter.post('/login', asyncHandler(async function (req, res) {
  const user = await getUserByUsername(req.body.username);

  const passwordFromClient = req.body.password;
  const passwordFromDb = user.password;

  if (passwordFromClient !== passwordFromDb) {
    throw new CustomError('wrong auth', 'AUTH_FAILED', 403);
  }

  const token = jwt.sign({
    sub: user.id,
    iss: 'skilvul'
  }, process.env.JWT_SECRET);

  res.json({
    token
  });
}));

module.exports = userRouter

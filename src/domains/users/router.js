const express = require('express');

const buildRoutes = require('../../utils/buildRoutes');
const userController = require('./controller');

const usersRouter = express.Router();

const routes = {
  'POST: /register': [userController.register],
  'POST: /login': [userController.login]
};

buildRoutes(usersRouter, routes);

module.exports = usersRouter

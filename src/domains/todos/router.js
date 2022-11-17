const todosRouter = require('express').Router();

const { authentication, authorizationForUser, authorizationForAdmin } = require('../../middlewares/auth');
const { validationTodosCreation } = require('../../middlewares/validation');
const buildRoutes = require('../../utils/buildRoutes');
const todosController = require('./controller');

const routes = {
  'POST: /': [authentication, authorizationForAdmin, validationTodosCreation, todosController.create],
  'GET: /': [todosController.list],
  'GET: /:id': [todosController.detail],
  'PUT: /:id': [todosController.update],
  'DELETE: /:id': [authentication, todosController.delete]
}

buildRoutes(todosRouter, routes);

module.exports = todosRouter;

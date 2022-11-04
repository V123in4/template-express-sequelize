const express = require('express');

const commentRouter = express.Router();

commentRouter.get('/comment', function (req, res) {
  res.json({
    comment: 'gas!'
  });
});

commentRouter.post('/comment', function (req, res) {
  res.json({
    comment: 'created!'
  });
});

module.exports = commentRouter
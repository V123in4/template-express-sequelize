const express = require('express');

const categoryRouter = express.Router();

categoryRouter.get('/category', function (req, res) {
  res.json({
    category: 'gas!'
  });
});

categoryRouter.post('/category', function (req, res) {
  res.json({
    category: 'created!'
  });
});

module.exports = categoryRouter
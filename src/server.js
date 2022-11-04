const express = require('express');
const categoryRouter = require('./routers/category')
const commentRouter = require('./routers/comment')

const app = express();

app.use(express.json());

const authentication = function (req, res, next) {
  if (req.headers.authorization) {
    // logic
  }

  // kalau gak ada masalah
  next();
}
app.use(authentication);

app.use(categoryRouter);
app.use(commentRouter);

const handler0 = function (req, res, next) {
  console.log('ini middleware sebelum main handler');
  next();
};

const handler1 = function (req, res, next) {
  res.json({
    foo: 'bar'
  });
  next();
}

const handler2 = function (req, res, next) {
  console.log('ini middleware setelah main handler')
}

app.get('/blog', handler0, handler1, handler2);

app.post('/blog', function (req, res, next) {
  console.log(req.headers.token);
  console.log(req.body);
  res.json({
    result: 'blog created!'
  });

  next();
});

app.all('*', function (req, res) {
  res.status(404).json({
    message: 'not found'
  });
});

app.listen(3001);

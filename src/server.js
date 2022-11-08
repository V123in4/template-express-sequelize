const express = require('express');
const categoryRouter = require('./routers/category')
const commentRouter = require('./routers/comment')

class CustomError extends Error {
  code = null;
  status = null;

  constructor(message, code, status) {
    super(message)
    this.code = code;
    this.status = status;
  }
}

const app = express();

app.use(express.json());

app.use(function (req, res, next) {
  if (req.headers.token === undefined) {
    throw new CustomError('token required', 'AUTH_FAILED', 403);
  }

  if (req.headers.token !== 'abcd') {
    throw new CustomError('token wrong', 'TOKEN_WRONG', 401);
  }

  // kalau gak ada masalah
  next();
});

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
  // handle authen X
  // handle autho X
  console.log(req.headers.token);
  console.log(req.body);
  res.json({
    result: 'blog created!'
  });
});

app.all('*', function (req, res) {
  res.status(404).json({
    message: 'not found'
  });
});

// middleware error handler
app.use(function (err, req, res, next) {
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

app.listen(3001);

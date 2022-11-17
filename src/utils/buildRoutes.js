const asyncWrap =
  (fn) =>
  (req, res, next, ...args) => {
    const fnReturn = fn(req, res, next, ...args);
    return Promise.resolve(fnReturn).catch(next);
  };

const buildRoutes = (router, routes) => {
  Object.keys(routes).forEach((route) => {
    const [method, path] = route.split(': ');
    router[method.toLowerCase()](path, ...routes[route].map((handler) => asyncWrap(handler)));
  });
};

module.exports = buildRoutes;

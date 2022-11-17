const  jwt = require("jsonwebtoken");
const repository = require("../domains/users/repository");
const { CustomError } = require("../errors/customError");

const authentication = async function(req, res, next) {
  const token = req.headers.authorization;

  try {
    jwt.verify(token, process.env.JWT_SECRET);

    next();
  } catch (error) {
    throw new CustomError('the token is invalid', 'TOKEN_INVALID', 403);
  }
};

const authorizationForAdmin = async function(req, res, next) {
  const token = req.headers.authorization;
  const decode = jwt.decode(token);
  const user = await repository.getUserById(decode.sub);

  if (user.role !== 'Admin') {
    throw new Error()
  }
};

const authorizationForUser = async function(req, res, next) {
  const token = req.headers.authorization;
  const decode = jwt.decode(token);
  const user = await repository.getUserById(decode.sub);

  if (user.role !== 'User') {
    throw new Error()
  }
};

module.exports = {
  authentication,
  authorizationForAdmin,
  authorizationForUser
};

const  jwt = require("jsonwebtoken");
const { CustomError } = require("../errors/customError");
const { asyncHandler } = require("../helpers/asyncHandler");

const authenticated = asyncHandler(async function(req, res, next) {
  const token = req.headers.authorization;

  try {
    jwt.verify(token, process.env.JWT_SECRET);

    next();
  } catch (error) {
    throw new CustomError('the token is invalid', 'TOKEN_INVALID', 403);
  }
});

module.exports = {
  authenticated
};

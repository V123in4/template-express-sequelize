const { CustomError } = require("../errors/customError");

const validationTodosCreation = async function(req, res) {
  const title = req.body.title;

  if (typeof title !== 'string') {
    throw new CustomError();
  }
};


module.exports = {
  validationTodosCreation,
}
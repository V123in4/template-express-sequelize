class CustomError extends Error {
  code = null;
  status = null;

  constructor(message, code, status) {
    super(message)
    this.code = code;
    this.status = status;
  }
}

module.exports = {
  CustomError
};

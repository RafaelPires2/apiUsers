const ResponseSuccess = (res, data, message) => {
  return res
    .status(res.statusCode)
    .json({ data: data, message: message, status: res.statusCode });
};

const ResponseError = (res, message, statusCode) => {
  return res.status(statusCode).json({ message: message, status: statusCode });
};

module.exports = {
  ResponseSuccess,
  ResponseError,
};

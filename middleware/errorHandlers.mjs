class ErrorHandler {
  static globalErrorHandler = (err, req, res, next) => {
    console.log(err);
    res.status(500).json({
      status: "error",
      err: err,
    });
  };

  static queryErrorHandler = (err, req, res, next) => {
    console.log(err);
  };
}

export default ErrorHandler;

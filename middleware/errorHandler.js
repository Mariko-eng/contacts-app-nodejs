
const { constants } = require("../constants");

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode? res.statusCode : 500;

    switch (statusCode) {
      case constants.VALIATION_ERROR:
        res.json({
          title: "Validation Fialed",
          message: err.message,
          stackTrace: err.stack,
        });

      case constants.NOT_FOUND:
        res.json({
          title: "Not Found",
          message: err.message,
          stackTrace: err.stack,
        });

      case constants.UNAUTHORIZED:
        res.json({
          title: "Un Authorized",
          message: err.message,
          stackTrace: err.stack,
        });

      case constants.FORBIDDEN:
        res.json({
          title: "Forbidden",
          message: err.message,
          stackTrace: err.stack,
        });

      case constants.SEERVER_ERROR:
        res.json({
          title: "Server error",
          message: err.message,
          stackTrace: err.stack,
        });

      default:
        console.log("Error ", err);
        break;
    }
}

module.exports = errorHandler
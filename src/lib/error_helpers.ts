const ApplicationError = require("./application_error");


exports.throwBadRequestError = (message?: string): void => {
    throw new ApplicationError(message || 'Bad Request', 400);
}
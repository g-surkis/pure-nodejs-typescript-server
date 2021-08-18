import { ServerResponse } from "http";
const ApplicationError = require("./application_error");

const errorResponse = (error: typeof ApplicationError, res: ServerResponse): void => {
    const { status, message, } = error;

    res.writeHead(status || 500, {
        "Content-Type": "application/json",
    });

    res.write(JSON.stringify({
        message
    }));

    return res.end();
};

const sendResponse = (res: ServerResponse, data: object): void => {
    res.writeHead(200, {
        "Content-Type": "application/json",
    });

    res.write(JSON.stringify({
        data
    }));

    return res.end();
};


module.exports = { errorResponse, sendResponse };
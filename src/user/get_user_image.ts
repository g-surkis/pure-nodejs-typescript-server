const url = require("url");
const path = require("path");
const fs = require("fs");
const ApplicationError = require("../lib/application_error");
import { IncomingMessage, ServerResponse } from "http";
const { validateSimpleTypeParam } = require("../lib/validation_helpers");

const { mime } = require("../constants/mime");
const { IMAGES_PATH } = require("../constants/config");

const getUserImage = async (req: IncomingMessage, res: ServerResponse): Promise<void> => {
    const queryObject = url.parse(req.url, true).query;
    const { name } = queryObject;
    validateSimpleTypeParam(name, 'string');

    try {
        const type = mime[path.extname(name).slice(1)] || "text/plain";
        const s = fs.createReadStream(`${IMAGES_PATH}/${name}`);
        s.on("open", function () {
            res.writeHead(200, {
                "Content-Type": type,
            });
            s.pipe(res);
        });
        s.on("error", function () {
            throw new ApplicationError("Not found", 404);
        });

    } catch (error) {
        throw error;
    }
};


module.exports = { getUserImage };
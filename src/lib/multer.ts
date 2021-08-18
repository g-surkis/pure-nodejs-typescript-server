import { IncomingMessage, ServerResponse } from "http";

const multer = require("multer");
const createCustomStorage = require("./customStorage");
const { IMAGES_PATH } = require("../constants/config");

interface Req extends IncomingMessage {
    fileValidationError?: string;
    body: any;
    files: Array<any>;
}

const imageFilter = function (req: Req, file: { originalname: string }, cb: Function) {
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        const errorMessage = "Only image files are allowed!";

        req.fileValidationError = errorMessage;
        return cb(new Error(errorMessage), false);
    }
    cb(null, true);
};

const Storage = createCustomStorage({
    destination: function (req: IncomingMessage, file: { originalname: string }, cb: Function) {
        cb(null, `${IMAGES_PATH}/${Date.now()}-${file.originalname.split(".")[0]}.png`);
    }
});

const upload = multer({
    storage: Storage,
    fileFilter: imageFilter
}).array("file", 1);

const storeImage = (req: Req, res: ServerResponse) => new Promise(
    (resolve, reject) => {
        upload(req, res, function (error: Error) {
            const { body, files } = req;

            if (req.fileValidationError) {
                return reject({ status: 403, message: req.fileValidationError });
            }
            else if (!files || !files.length) {
                return reject({ status: 403, message: "Please select an image to upload" });
            }

            if (error) {
                return reject({ status: 403, message: "Something went wrong!" });
            }
            resolve({ body, file: files[0] });
        });

    });

module.exports = { storeImage };




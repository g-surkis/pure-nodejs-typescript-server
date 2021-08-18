const fs = require("fs");
const sharp = require("sharp");
import { IncomingMessage } from "http";


class MyCustomStorage {
    public getDestination: Function;
    constructor(opts: { destination: Function }) {
        this.getDestination = opts.destination;
    }

    _handleFile(
        req: IncomingMessage, file: any, cb: Function) {
        this.getDestination(req, file, function (err: Error, path: string) {
            if (err) return cb(err);
            const sharpInst = sharp();
            const outStream = fs.createWriteStream(path);

            file.stream.pipe(sharpInst);

            sharpInst
                .metadata()
                .then(function (metadata: { [key: string]: number }) {
                    return sharpInst
                        .extract({
                            width: 200,
                            height: 200,
                            left: (metadata.width - 200) / 2,
                            top: (metadata.height - 200) / 2,
                        })
                        .pipe(outStream);
                });

            outStream.on("error", cb);
            outStream.on("finish", function () {
                cb(null, {
                    path: path,
                    size: outStream.bytesWritten
                });
            });
        });
    }


    _removeFile(
        req: IncomingMessage, file: any, cb: Function) {
        fs.unlink(file.path, cb);
    }
}


module.exports = function (opts: { destination: Function }) {
    return new (MyCustomStorage as any)(opts);
};

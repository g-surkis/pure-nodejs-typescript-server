
import { createServer, IncomingMessage, ServerResponse } from "http";

const { router } = require("./router");

createServer(
    (req: IncomingMessage, res: ServerResponse): void => {
        router.route(req, res)
    })
    .listen(8000);


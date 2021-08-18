const url = require("url");
import { IncomingMessage, ServerResponse } from "http";
const { userRoutes } = require("./user/routes");
const { errorResponse } = require("./lib/router_helpers");
const ApplicationError = require("./lib/application_error");

interface Routes {
    [key: string]: {
        [key: string]: any
    };
}

class Router {
    static _instance: Router | null;
    public routes: Routes = {};

    constructor() {
        if (!Router._instance) {
            Router._instance = this;
        }
        return Router._instance;
    }

    async route(req: IncomingMessage, res: ServerResponse) {
        try {
            const handler = this.parseReq(req, res);
            await handler(req, res);
        } catch (err) {
            await errorResponse(err, res);
        }
    }

    register(path: string, method: string, handler: Function): void {
        if (!this.routes[path]) this.routes[path] = {};
        this.routes[path][method] = handler;
    }

    parseReq(req: IncomingMessage, res: ServerResponse) {
        const parsedUrl = url.parse(req.url, true);
        const httpMethod: string = req.method || "";

        try {
            return this.routes[parsedUrl.pathname][httpMethod.toLowerCase()];
        } catch (error) {
            throw new ApplicationError("Not found", 404);
        }
    }

    static getInstance() {
        return this._instance;
    }
}

new Router();
const router = Router.getInstance();
userRoutes(router);

module.exports = { router, Router };
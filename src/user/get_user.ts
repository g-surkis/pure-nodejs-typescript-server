import { IncomingMessage, ServerResponse } from "http";
const url = require("url");
const { knex } = require("../knex/knex");
const { USERS_TABLE } = require("../constants/db_tables");
const { sendResponse } = require("../lib/router_helpers");
const ApplicationError = require("../lib/application_error");
import { UserIdReturningArrayType } from "../types";
const { validateUserId } = require("../lib/validation_helpers");

const getUser = async (req: IncomingMessage, res: ServerResponse): Promise<void> => {
    const queryObject = url.parse(req.url, true).query;
    const { id } = queryObject;
    validateUserId(id);

    try {
        const user: UserIdReturningArrayType = await knex(USERS_TABLE)
            .select()
            .where({ id });
        if (user.length) {
            sendResponse(res, { user: user[0] });
        } else {
            throw new ApplicationError("User does not exist", 404);
        }


    } catch (error) {
        console.log("error: ", error);
        throw error;
    }
};

module.exports = { getUser };
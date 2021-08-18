import { IncomingMessage, ServerResponse } from "http";
const { storeImage } = require("../lib/multer");
const { knex } = require("../knex/knex");
const { USERS_TABLE } = require("../constants/db_tables");
const { sendResponse } = require("../lib/router_helpers");
import { UserIdReturningArrayType } from "../types";

const { validateEmail, validateName, validateSurname } = require("../lib/validation_helpers");

const createUser = async (req: IncomingMessage, res: ServerResponse): Promise<void> => {
    try {
        const { body, file } = await storeImage(req, res);
        const { name, surname, email } = body;
        const { path } = file;

        validateName(name);
        validateSurname(surname);
        validateEmail(email);


        const user: UserIdReturningArrayType = await knex(USERS_TABLE)
            .insert(
                {
                    first_name: name,
                    last_name: surname,
                    email,
                    thumbnail: path.split("/")[2]
                })
            .returning(["id"]);

        sendResponse(res, {
            userId: user[0].id
        });

    } catch (error) {
        console.log(error);
        throw error;
    }
};


module.exports = { createUser };
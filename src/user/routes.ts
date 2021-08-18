
const { createUser } = require("./create_user");
const { getUser } = require("./get_user");
const { getUserImage } = require("./get_user_image");
const { Router } = require("../router");

const userRoutes = (router: typeof Router) => {
    router.register("/api/user/create", "post", createUser);
    router.register("/api/user", "get", getUser);
    router.register("/api/user/image", "get", getUserImage);

    console.log("router: ", router);
};


module.exports = { userRoutes };
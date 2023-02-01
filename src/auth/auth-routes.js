module.exports = app => {
    const auth = require('./auth-controller');
    const router = require('express').Router();
    const jwtMiddleware = require('./jwt-middleware');

    router.post("/libraryapi/api/v1/register", auth.register);

    router.post("/libraryapi/api/v1/sign-in", auth.signIn);

    router.get("/libraryapi/api/v1/me", jwtMiddleware.checkJwtTokenMiddleware, auth.getCurrentUser)

    // -- To declare the prefix path of your API service
    app.use("/", router);
}
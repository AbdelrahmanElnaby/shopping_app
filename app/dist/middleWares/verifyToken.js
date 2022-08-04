"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tokenMethods_1 = require("../utilities/tokenMethods");
const verify_token = (req, res, next) => {
    try {
        const { Authorization } = req.headers;
        const payload = (0, tokenMethods_1.verifyToken)(Authorization);
        next();
        return;
    }
    catch (error) {
        res.status(400);
        res.json(error);
        return;
    }
};
exports.default = verify_token;

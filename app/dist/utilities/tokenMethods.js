"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const createToken = (name) => {
    const key = process.env.secret_key;
    const result = jsonwebtoken_1.default.sign(name, key);
    return result;
};
exports.createToken = createToken;
const verifyToken = (authorizationH) => {
    try {
        const token = authorizationH.split(' ')[1];
        const key = process.env.secret_key;
        const payload = jsonwebtoken_1.default.verify(token, key);
        return payload;
    }
    catch (error) {
        throw error;
    }
};
exports.verifyToken = verifyToken;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authontication_1 = require("../../handler/authontication");
const authontication = express_1.default.Router();
authontication.post("/", authontication_1.authonticate);
exports.default = authontication;

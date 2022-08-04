"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usrs_1 = require("../../handler/usrs");
const verifyToken_1 = __importDefault(require("../../middleWares/verifyToken"));
const usrs = express_1.default.Router();
usrs.get("/", verifyToken_1.default, usrs_1.index);
usrs.get("/:id", verifyToken_1.default, usrs_1.show);
usrs.post("/", usrs_1.create);
usrs.put("/:id", verifyToken_1.default, usrs_1.update);
usrs.delete("/:id", verifyToken_1.default, usrs_1.del);
exports.default = usrs;

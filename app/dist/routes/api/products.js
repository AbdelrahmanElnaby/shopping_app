"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const products_1 = require("../../handler/products");
const verifyToken_1 = __importDefault(require("../../middleWares/verifyToken"));
const products = express_1.default.Router();
products.get("/", products_1.index);
products.get("/:id", products_1.show);
products.post("/", verifyToken_1.default, products_1.create);
products.put("/:id", products_1.update);
products.delete("/:id", products_1.del);
exports.default = products;

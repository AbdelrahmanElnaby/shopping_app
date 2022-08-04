"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orders_1 = require("../../handler/orders");
const verifyToken_1 = __importDefault(require("../../middleWares/verifyToken"));
const orders = express_1.default.Router();
orders.get("/", verifyToken_1.default, orders_1.index);
orders.get("/:id", verifyToken_1.default, orders_1.show);
orders.post("/", verifyToken_1.default, orders_1.create);
orders.post("/:id/products", verifyToken_1.default, orders_1.addProduct);
orders.put("/:id", verifyToken_1.default, orders_1.update);
orders.delete("/id", verifyToken_1.default, orders_1.del);
exports.default = orders;

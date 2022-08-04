"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const products_1 = __importDefault(require("./api/products"));
const usrs_1 = __importDefault(require("./api/usrs"));
const orders_1 = __importDefault(require("./api/orders"));
const authontication_1 = __importDefault(require("./api/authontication"));
const dashboard_1 = __importDefault(require("./api/dashboard"));
const routes = express_1.default.Router();
routes.get("/", (req, res) => {
    res.send("welcome to storeFront");
});
routes.use("/products", products_1.default);
routes.use("/usrs", usrs_1.default);
routes.use("/orders", orders_1.default);
routes.use("/authontication", authontication_1.default);
routes.use("/dashboard", dashboard_1.default);
exports.default = routes;

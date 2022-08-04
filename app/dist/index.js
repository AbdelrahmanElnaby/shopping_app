"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const index_1 = __importDefault(require("./routes/index"));
const app = (0, express_1.default)();
// parse the request json body to javascript object
app.use(body_parser_1.default.json());
app.use("/store", index_1.default);
// initialize the port and host
const port = 3000;
const host = "localhost";
// create the server
app.listen(port, host, () => {
    console.log(`server is running on port 0.0.0.0.${port}`);
});

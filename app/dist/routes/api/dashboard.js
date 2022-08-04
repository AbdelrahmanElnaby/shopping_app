"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dashboard_1 = require("../../handler/dashboard");
const verifyToken_1 = __importDefault(require("../../middleWares/verifyToken"));
const dashboard = (0, express_1.Router)();
dashboard.get("/currentUserOrder/:id", verifyToken_1.default, dashboard_1.currentUserOrder);
exports.default = dashboard;

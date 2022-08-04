"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.del = exports.update = exports.create = exports.show = exports.index = void 0;
const products_1 = __importDefault(require("../models/products"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield products_1.default.index();
        res.json(result);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
});
exports.index = index;
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield products_1.default.show(Number(id));
        res.json(result);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
});
exports.show = show;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = req.body;
        const result = yield products_1.default.create(product);
        res.set({ authorization: req.headers.authorization });
        res.json(result);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
});
exports.create = create;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const product = req.body;
        const result = yield products_1.default.update(id, product);
        res.json(result);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
});
exports.update = update;
const del = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const result = yield products_1.default.delete(id);
        res.json(result);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
});
exports.del = del;

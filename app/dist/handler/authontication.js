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
exports.authonticate = void 0;
const authontication_1 = __importDefault(require("../services/authontication"));
const authonticate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body;
        const result = yield authontication_1.default.authonticate(user);
        if (!result[0]) {
            res.send(result);
            return;
        }
        const token = result[1];
        res.set({ authorization: `bearer ${token}` });
        res.send("success");
        return;
    }
    catch (error) {
        res.status(400);
        res.json(error);
        return;
    }
});
exports.authonticate = authonticate;

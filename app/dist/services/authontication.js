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
const database_1 = __importDefault(require("../database"));
const tokenMethods_1 = require("../utilities/tokenMethods");
const bcryptMethods_1 = require("../utilities/bcryptMethods");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class Authontication {
    authonticate(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const con = yield database_1.default.connect();
                const sql = 'SELECT * FROM usrs WHERE firstName=$1 and lastName=$2'.trim();
                const { firstName, lastName, password } = user;
                const options = [firstName, lastName];
                const result = yield con.query(sql, options);
                const row = result.rows;
                if (!row.length) {
                    return [false, "user not Found"];
                }
                const verifyUser = (0, bcryptMethods_1.comparing)(password, row[0].passwd);
                if (!verifyUser) {
                    return [false, "incorrect password"];
                }
                const token = (0, tokenMethods_1.createToken)(user);
                return [true, token];
            }
            catch (error) {
                throw error;
            }
        });
    }
}
const authontication = new Authontication();
exports.default = authontication;

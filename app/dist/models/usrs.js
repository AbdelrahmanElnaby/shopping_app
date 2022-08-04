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
const bcryptMethods_1 = require("../utilities/bcryptMethods");
class Usrs {
    // display all usrs
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const con = yield database_1.default.connect();
                const sql = 'SELECT * FROM usrs'.trim();
                const result = yield con.query(sql);
                con.release();
                return result.rows;
            }
            catch (error) {
                throw error;
            }
        });
    }
    //display a specific usr
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const con = yield database_1.default.connect();
                const sql = 'SELECT * FROM usrs WHERE id=$1'
                    .trim();
                const result = yield con.query(sql, [id]);
                con.release();
                return result.rows[0];
            }
            catch (error) {
                throw error;
            }
        });
    }
    // create new user
    create(usr) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(usr);
            const { firstName, lastName, password } = usr;
            try {
                const con = yield database_1.default.connect();
                const sql = 'INSERT INTO usrs (firstName,lastName,passwd) VALUES ($1,$2,$3) RETURNING *'.trim();
                const passwd = (0, bcryptMethods_1.hashing)(password);
                const options = [firstName, lastName, passwd];
                const result = yield con.query(sql, options);
                con.release();
                return result.rows[0];
            }
            catch (error) {
                throw error;
            }
        });
    }
    update(id, usr) {
        return __awaiter(this, void 0, void 0, function* () {
            const { firstName, lastName, password } = usr;
            try {
                const con = yield database_1.default.connect();
                const passwd = (0, bcryptMethods_1.hashing)(password);
                const sql = 'UPDATE usrs SET firstName=$2 , lastName=$3 , passwd=$4 WHERE id=$1 RETURNING *'.trim();
                const options = [id, firstName, lastName, passwd];
                const result = yield con.query(sql, options);
                con.release();
                return result.rows[0];
            }
            catch (error) {
                throw error;
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const con = yield database_1.default.connect();
                const sql = 'DELETE FROM usrs WHERE id=$1 RETURNING *'
                    .trim();
                const result = yield con.query(sql, [id]);
                con.release();
                return result.rows[0];
            }
            catch (error) {
                throw error;
            }
        });
    }
}
const usrs = new Usrs();
exports.default = usrs;
/*products.show(1).then((fulfill)=>{
    console.log(fulfill);
});*/ 

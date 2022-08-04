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
class Products {
    // display all products
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const con = yield database_1.default.connect();
                const sql = 'SELECT * FROM products'.trim();
                const result = yield con.query(sql);
                con.release();
                return result.rows;
            }
            catch (error) {
                throw error;
            }
        });
    }
    //display a specific product
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const con = yield database_1.default.connect();
                const sql = 'SELECT * FROM products WHERE id=$1'
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
    // create new product
    create(product) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const con = yield database_1.default.connect();
                const sql = 'INSERT INTO products (name,price) VALUES ($1,$2) RETURNING *'.trim();
                const options = [product.name, product.price];
                const result = yield con.query(sql, options);
                con.release();
                return result.rows[0];
            }
            catch (error) {
                throw error;
            }
        });
    }
    update(id, product) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, price } = product;
            try {
                const con = yield database_1.default.connect();
                const sql = 'UPDATE products SET name=$2 , price=$3 WHERE id=$1 RETURNING *'.trim();
                const options = [id, name, price];
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
                const sql = 'DELETE FROM products WHERE id=$1 RETURNING *'
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
const products = new Products();
exports.default = products;
/*const products=new Products();
products.index().then((fulfill)=>{
    console.log(fulfill);
});
*/ 

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
class Orders {
    // display all products
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const con = yield database_1.default.connect();
                const sql = 'SELECT * FROM orders'.trim();
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
                const sql = 'SELECT * FROM orders WHERE id=$1'
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
    create(order) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const con = yield database_1.default.connect();
                const sql = 'INSERT INTO orders (user_id,status) VALUES ($1,$2) RETURNING *'.trim();
                const options = [order.user_id, order.status];
                const result = yield con.query(sql, options);
                con.release();
                return result.rows[0];
            }
            catch (error) {
                throw error;
            }
        });
    }
    update(id, order) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user_id, status } = order;
            try {
                const con = yield database_1.default.connect();
                const sql = 'UPDATE orders SET user_id=$2 , status=$3 WHERE id=$1 RETURNING *'.trim();
                const options = [id, user_id, status];
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
                const sql = 'DELETE FROM orders WHERE id=$1 RETURNING *'
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
    // current order by user
    currentOrder(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const con = yield database_1.default.connect();
                const sql = 'SELECT * FROM orders WHERE user_id=$1 and status=$2'.trim();
                const options = [user_id, 'active'];
                const result = yield con.query(sql, options);
                con.release();
                return result.rows[0];
            }
            catch (error) {
                throw error;
            }
        });
    }
    // add a product to an order
    addProduct(order_id, order_products) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("2", order_products, order_id);
            const { product_id, quantity } = order_products;
            try {
                const con = yield database_1.default.connect();
                yield this.checkOrderStatus(con, order_id);
                console.log("3");
                const sql = 'INSERT INTO order_products VALUES ($1,$2,$3) RETURNING *'.trim();
                const options = [order_id, product_id, quantity];
                const result = yield con.query(sql, options);
                con.release();
                return result.rows[0];
            }
            catch (error) {
                throw error;
            }
        });
    }
    // check the order and its status 
    checkOrderStatus(con, order_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'SELECT * FROM orders WHERE id=$1 AND status=$2'.trim();
                const result = yield con.query(sql, [order_id, 'active']);
                if (!result.rowCount) {
                    throw new Error('the order_id or status is rejected');
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
}
const orders = new Orders();
exports.default = orders;

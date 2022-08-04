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
;
;
const userOrder = {
    userId: 0,
    orderId: 0,
    orderStatus: "",
    products: [],
    totalCost: 0
};
class Dashboard {
    currentUserOrder(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const con = yield database_1.default.connect();
                const options = [user_id, 'active'];
                let sql = 'select * from orders where user_id=$1 and status=$2';
                let result = yield con.query(sql, options);
                if (!result.rows.length) {
                    console.log("1---");
                    throw new Error("No order found");
                }
                userOrder.userId = result.rows[0].user_id;
                userOrder.orderId = result.rows[0].id;
                userOrder.orderStatus = result.rows[0].status;
                sql =
                    'select op.product_id , op.quantity from order_products as op inner join orders as o on o.id =op.order_id where o.user_id=$1 and status =$2';
                result = yield con.query(sql, options);
                if (!result.rows.length) {
                    return userOrder;
                }
                sql =
                    'select p.id as productId ,pp.quantity as quantity , pp.quantity *p.price as cost from products as p inner join (select op.product_id , op.quantity from order_products as op inner join orders as o on o.id =op.order_id where o.user_id=$1 and status =$2) as pp on p.id=pp.product_id';
                result = yield con.query(sql, options);
                userOrder.products = result.rows;
                sql =
                    'select sum(cost) as cost from (select p.id as productId ,pp.quantity as quantity , pp.quantity *p.price as cost from products as p inner join (select op.product_id , op.quantity from order_products as op inner join orders as o on o.id =op.order_id where o.user_id=$1 and status =$2) as pp on p.id=pp.product_id) as total';
                result = yield con.query(sql, options);
                userOrder.totalCost = result.rows[0].cost;
                con.release();
                return userOrder;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
const dashboard = new Dashboard();
exports.default = dashboard;

import express, { Request, Response } from "express"
import {index,show,create,addProduct,update,del} from "../../handler/orders"
import verify_token from "../../middleWares/verifyToken";

const orders=express.Router();

orders.get("/",verify_token,index);
orders.get("/:id",verify_token,show);
orders.post("/",verify_token,create);
orders.post("/:id/products",verify_token,addProduct);
orders.put("/:id",verify_token,update);
orders.delete("/id",verify_token,del);

export default orders;
import express, { Request, Response } from "express"
import {index,show,create,update,del} from "../../handler/products"
import verify_token from "../../middleWares/verifyToken";
const products=express.Router();

products.get("/",index);
products.get("/:id",show);
products.post("/",verify_token,create);
products.put("/:id",update);
products.delete("/:id",del);
export default products;
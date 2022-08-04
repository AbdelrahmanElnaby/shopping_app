import express, { Request, Response } from "express"
import products from "./api/products"
import usrs from "./api/usrs"
import orders from "./api/orders"
import authontication from "./api/authontication"
import dashboard from "./api/dashboard"
const routes=express.Router();

routes.get("/",(req:Request,res:Response)=>{
res.send("welcome to storeFront");
});

routes.use("/products",products);
routes.use("/usrs",usrs);
routes.use("/orders",orders);
routes.use("/authontication",authontication);
routes.use("/dashboard",dashboard);

export default routes;
import express, { Request, Response } from "express"
import {index,show,create,update,del} from "../../handler/usrs"
import verify_token from "../../middleWares/verifyToken";

const usrs=express.Router();

usrs.get("/",verify_token,index);
usrs.get("/:id",verify_token,show);
usrs.post("/",create);
usrs.put("/:id",verify_token,update);
usrs.delete("/:id",verify_token,del);
export default usrs;
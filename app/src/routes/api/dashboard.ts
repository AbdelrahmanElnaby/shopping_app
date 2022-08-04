import express,{ Router } from "express";
import { currentUserOrder } from "../../handler/dashboard";
import verify_token from "../../middleWares/verifyToken";
const dashboard=Router();

dashboard.get("/currentUserOrder/:id",verify_token,currentUserOrder);

export default dashboard;
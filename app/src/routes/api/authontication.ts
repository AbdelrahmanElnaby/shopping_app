import express from "express"
import { authonticate } from "../../handler/authontication";

const authontication=express.Router();

authontication.post("/",authonticate);

export default authontication;
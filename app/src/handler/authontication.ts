import { Request,Response } from "express";
import authontication from "../services/authontication";

export const authonticate= async(req:Request,res:Response):Promise<void>=>{
    try{
        const user=req.body;
        const result = await authontication.authonticate(user);
        if(! result[0]){
            res.send(result);
            return;
        }
        const token=result[1];
        res.set({authorization:`bearer ${token}`});
        res.send("success");
        return;
        
    }
    catch(error){
        res.status(400);
        res.json(error);
        return;
    }
}


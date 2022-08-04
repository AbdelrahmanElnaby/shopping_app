import { Request,Response } from "express";
import usrs ,{Usr}from "../models/usrs"

export const index=async (req:Request,res:Response):Promise<void>=>{

    try{
        const result =await usrs.index();
        res.set({Authorization:req.headers.authorization});
        res.json(result);
    }
    catch(error){
        res.status(400);
        res.json(error);
    }  
}



export const show=async (req:Request,res:Response):Promise<void>=>{

    try{
        const id:number=Number(req.params.id);
        const result =await usrs.show(id);
        res.set({Authorization:req.headers.authorization});
        res.json(result);
    }
    catch(error){
        res.status(400);
        res.json(error);
    }  
}


export const create=async (req:Request,res:Response):Promise<void>=>{

    try{
        const user:Usr=req.body;
        const result =await usrs.create(user);
        res.json(result);
    }
    catch(error){
        res.status(400);
        res.json(error);
    }  
}

export const update=async (req:Request,res:Response):Promise<void>=>{

    try{
        const id=Number(req.params.id);
        const usr=req.body;
        const result= await usrs.update(id,usr);
        res.set({Authorization:req.headers.authorization});
        res.json(result);
    }
    catch(error){
        res.status(400);
        res.json(error);
    }
}

export const del=async (req:Request,res:Response):Promise<void>=>{

    try{
        const id:number=Number(req.params.id);
        const result= await usrs.delete(id);
        res.json(result);
    }
    catch(error){
        res.status(400);
        res.json(error);
    }
}
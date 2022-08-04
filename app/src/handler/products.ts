import { Request,Response } from "express";
import products ,{Product} from "../models/products"


export const index= async (req:Request,res:Response):Promise<void>=>{
    try{
        const result= await products.index();
        res.json(result);
    }
    catch(error){
        res.status(400);
        res.json(error);
    }
}


export const show= async (req:Request,res:Response):Promise<void>=>{
    try{
        const id=req.params.id;
        const result= await products.show(Number(id));
        res.json(result);
    }
    catch(error){
        res.status(400);
        res.json(error);
    }
}


export const create= async (req:Request,res:Response):Promise<void>=>{
    try{
        const product:Product=req.body;
        const result= await products.create(product);
        res.set({authorization:req.headers.authorization});
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
        const product=req.body;
        const result= await products.update(id,product);
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
        const result= await products.delete(id);
        res.json(result);
    }
    catch(error){
        res.status(400);
        res.json(error);
    }
}




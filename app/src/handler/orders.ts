import { Request,Response } from "express";
import orders from "../models/orders"

export const index=async (req:Request,res:Response):Promise<void>=>{

    try{
        const result= await orders.index();
        res.set({authorization:req.headers.authorization});
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
        const result= await orders.show(id);
        res.set({authorization:req.headers.authorization});
        res.json(result);
    }
    catch(error){
        res.status(400);
        res.json(error);
    }
}


export const create=async (req:Request,res:Response):Promise<void>=>{

    try{
        const order=req.body;
        const result= await orders.create(order);
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
        const order=req.body;
        const result= await orders.update(id,order);
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
        const result= await orders.delete(id);
        res.json(result);
    }
    catch(error){
        res.status(400);
        res.json(error);
    }
}

/*export const currentOrder=async (req:Request,res:Response):Promise<void>=>{

    try{
        const usr_id:number=Number(req.params.id);
        const result= await orders.currentOrder(usr_id);
        res.json(result);
    }
    catch(error){
        res.status(400);
        res.json(error);
    }
}

*/
export const addProduct=async (req:Request,res:Response):Promise<void>=>{

    try{
        const order_id:number=Number(req.params.id);
        const product=req.body;console.log("1",product);
        const result= await orders.addProduct(order_id,product);
        res.set({authorization:req.headers.authorization});
        res.json(result);
    }
    catch(error){
        res.status(400);
        res.json(error);
    }
}


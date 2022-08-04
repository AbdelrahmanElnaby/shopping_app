import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config();

type Name={
    firstName:string,
    lastName:string
};

export const createToken=(name:Name)=>{
    const key  = process.env.secret_key as string;
    const result=jwt.sign(name,key);
    return result;
}

export const verifyToken=(authorizationH:string):string=>{
    try{
    const token:string=authorizationH.split(' ')[1];
    const key = process.env.secret_key as string;
    const payload=jwt.verify(token,key) as string;
    return payload;
    }
    catch(error){
        throw error;
    }
}

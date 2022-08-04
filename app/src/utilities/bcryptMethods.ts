import * as bcrypt from "bcrypt"
import dotenv from "dotenv"
dotenv.config();

export const hashing=(password:string):string=>{
    const {pepper,saltRound}=process.env;
    const result=bcrypt.hashSync(password+pepper,
        Number(saltRound) );

    return result;
}

export const comparing=(password:string,hash:string):boolean=>{
    const {pepper}=process.env;
    const result=bcrypt.compareSync(password+pepper,
        hash );

    return result;
}

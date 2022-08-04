import client from "../database"
import {createToken} from "../utilities/tokenMethods"
import { comparing } from "../utilities/bcryptMethods"
import dotenv from "dotenv"
dotenv.config();

type User={
    firstName:string,
    lastName:string,
    password?:string
};

class Authontication{

    public async authonticate(user:User):Promise<(boolean|string)[]>{
        
        try{
            const con=await client.connect();
            const sql=
            'SELECT * FROM usrs WHERE firstName=$1 and lastName=$2'.trim();
            const {firstName,lastName,password}=user;
            const options=[firstName,lastName];
            const result=await con.query(sql,options);
            const row=result.rows;
            if(!row.length){
                return [false,"user not Found"];
                
            }
            const verifyUser=comparing(password as string,row[0].passwd);
            if(!verifyUser){
                return [false,"incorrect password"];
            }
            const token=createToken(user);
            return [true,token];
        }
        catch(error){
            throw error;
        }
    }

}

const authontication=new Authontication();
export default authontication;
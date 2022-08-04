import client from "../database"
import * as bcrypt from "bcrypt"
import {hashing} from "../utilities/bcryptMethods"

export type Usr={
    id?:number,
    firstName:string,
    lastName:string,
    password:string
};


class Usrs{

    // display all usrs
    public async index():Promise<Usr[]>{

        try{
            const con= await client.connect();
            const sql='SELECT * FROM usrs'.trim();
            const result= await con.query(sql);
            con.release();
            return result.rows;
        }
        catch(error){
            throw error;
        }
    }

    //display a specific usr
    public async show(id:number):Promise<Usr>{

        try{
            const con= await client.connect();
            const sql='SELECT * FROM usrs WHERE id=$1'
            .trim();
            const result= await con.query(sql,[id]);
            con.release();
            return result.rows[0];
        }
        catch(error){
            throw error;
        }
    }

// create new user
    public async create(usr:Usr):Promise<Usr>{
        console.log(usr);
        const {
            firstName,
            lastName,
            password
        }=usr;
        try{
            const con= await client.connect();
            const sql=
            'INSERT INTO usrs (firstName,lastName,passwd) VALUES ($1,$2,$3) RETURNING *'.trim();
            const passwd=hashing(password);
            const options=[firstName,lastName,passwd];
            const result= await con.query(sql,options);
            con.release();
            return result.rows[0];
        }
        catch(error){
            throw error;
        }
    }

    public async update(id:number,usr:Usr):Promise<Usr>{
        const {
            firstName,
            lastName,
            password }=usr;
        try{
            const con= await client.connect();
            const passwd=hashing(password);
            const sql=
            'UPDATE usrs SET firstName=$2 , lastName=$3 , passwd=$4 WHERE id=$1 RETURNING *'.trim();
            const options=[id,firstName,lastName,passwd];
            const result= await con.query(sql,options);
            con.release();
            return result.rows[0];
        }
        catch(error){
            throw error;
        }
    }

    public async delete(id:number):Promise<Usr>{

        try{
            const con= await client.connect();
            const sql='DELETE FROM usrs WHERE id=$1 RETURNING *'
            .trim();
            const result= await con.query(sql,[id]);
            con.release();
            return result.rows[0];
        }
        catch(error){
            throw error;
        }
    }

}

const usrs=new Usrs();
export default usrs;

/*products.show(1).then((fulfill)=>{
    console.log(fulfill);
});*/
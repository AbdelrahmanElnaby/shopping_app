import { PoolClient } from "pg";
import client from "../database"

type Order={
    id?:number,
    user_id:number,
    status:string
};

type Order_Products={
    order_id?:number,
    product_id:number,
    quantity:string
};

class Orders{

    // display all products
    public async index():Promise<Order[]>{

        try{
            const con= await client.connect();
            const sql='SELECT * FROM orders'.trim();
            const result= await con.query(sql);
            con.release();
            return result.rows;
        }
        catch(error){
            throw error;
        }
    }

    //display a specific product
    public async show(id:number):Promise<Order>{

        try{
            const con= await client.connect();
            const sql='SELECT * FROM orders WHERE id=$1'
            .trim();
            const result= await con.query(sql,[id]);
            con.release();
            return result.rows[0];
        }
        catch(error){
            throw error;
        }
    }

    // create new product
    public async create(order:Order):Promise<Order>{

        try{
            const con= await client.connect();
            const sql=
            'INSERT INTO orders (user_id,status) VALUES ($1,$2) RETURNING *'.trim();
            const options=[order.user_id,order.status];
            const result= await con.query(sql,options);
            con.release();
            return result.rows[0];
        }
        catch(error){
            throw error;
        }
    }

    public async update(id:number,order:Order):Promise<Order>{
        const {
            user_id,
            status}=order;
        try{
            const con= await client.connect();
            const sql=
            'UPDATE orders SET user_id=$2 , status=$3 WHERE id=$1 RETURNING *'.trim();
            const options=[id,user_id,status];
            const result= await con.query(sql,options);
            con.release();
            return result.rows[0];
        }
        catch(error){
            throw error;
        }
    }

    public async delete(id:number):Promise<Order>{

        try{
            const con= await client.connect();
            const sql='DELETE FROM orders WHERE id=$1 RETURNING *'
            .trim();
            const result= await con.query(sql,[id]);
            con.release();
            return result.rows[0];
        }
        catch(error){
            throw error;
        }
    }


    // current order by user
    public async currentOrder(user_id:number):Promise<Order>{
        try{
        const con= await client.connect();
        const sql=
        'SELECT * FROM orders WHERE user_id=$1 and status=$2'.trim();
        const options=[user_id,'active'];
        const result= await con.query(sql,options);
        con.release();
        return result.rows[0];
        }
        catch(error){
            throw error;
        }
    }

    // add a product to an order
    public async addProduct(order_id:number,order_products:Order_Products):Promise<Order>{
        console.log("2",order_products,order_id);
        const{
            product_id,
            quantity
        }=order_products;
        try{
            const con= await client.connect();
            await this.checkOrderStatus(con,order_id);
            console.log("3");
            const sql=
            'INSERT INTO order_products VALUES ($1,$2,$3) RETURNING *'.trim();
            const options= [order_id,product_id,quantity];
            const result= await con.query(sql,options);
            con.release();
            return result.rows[0];
        }
        catch(error){
            throw error;
        }
    }
    // check the order and its status 
    public async checkOrderStatus(con:PoolClient,order_id:number):Promise<void>{
        try{
        const sql=
        'SELECT * FROM orders WHERE id=$1 AND status=$2'.trim();
        const result= await con.query(sql,[order_id,'active']);
        if(!result.rowCount){
            throw new Error('the order_id or status is rejected');
        }
    }
    catch(error){
        throw error;
    }

    }

}

const orders=new Orders();
export default orders;
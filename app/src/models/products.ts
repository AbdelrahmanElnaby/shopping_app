import client from "../database"

export type Product={
    id?:number,
    name:string,
    price:number
};

class Products{

    // display all products
    public async index():Promise<Product[]>{

        try{
            const con= await client.connect();
            const sql='SELECT * FROM products'.trim();
            const result= await con.query(sql);
            con.release();
            return result.rows;
        }
        catch(error){
            throw error;
        }
    }

    //display a specific product
    public async show(id:number):Promise<Product>{

        try{
            const con= await client.connect();
            const sql='SELECT * FROM products WHERE id=$1'
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
    public async create(product:Product):Promise<Product>{

        try{
            const con= await client.connect();
            const sql=
            'INSERT INTO products (name,price) VALUES ($1,$2) RETURNING *'.trim();
            const options=[product.name,product.price];
            const result= await con.query(sql,options);
            con.release();
            return result.rows[0];
        }
        catch(error){
            throw error;
        }
    }

    public async update(id:number,product:Product):Promise<Product>{
        const {name,price }=product;
        try{
            const con= await client.connect();
            const sql=
            'UPDATE products SET name=$2 , price=$3 WHERE id=$1 RETURNING *'.trim();
            const options=[id,name,price];
            const result= await con.query(sql,options);
            con.release();
            return result.rows[0];
        }
        catch(error){
            throw error;
        }
    }

    public async delete(id:number):Promise<Product>{

        try{
            const con= await client.connect();
            const sql='DELETE FROM products WHERE id=$1 RETURNING *'
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

const products=new Products();

export default products;
/*const products=new Products();
products.index().then((fulfill)=>{
    console.log(fulfill);
});
*/
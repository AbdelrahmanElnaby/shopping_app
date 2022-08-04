import client from "../database"

interface Product{
    productId:number,
    quantity:number,
    cost:number
};
interface UserOrder{
    userId?:number
    orderId?:number,
    orderStatus?:string,
    products?: (Product[]),
    totalCost?:number
};
const userOrder:UserOrder={
    userId:0,
    orderId:0,
    orderStatus:"",
    products:[],
    totalCost:0
}; 

class Dashboard{

    public async currentUserOrder(user_id:number):Promise<UserOrder>{
        
        try{
            const con=await client.connect();
            const options=[user_id,'active'];
            let sql=
            'select * from orders where user_id=$1 and status=$2';
            let result=await con.query(sql,options);
            if(!result.rows.length){
                console.log("1---");
                throw new Error("No order found");
            }
            userOrder.userId=result.rows[0].user_id;
            userOrder.orderId=result.rows[0].id;
            userOrder.orderStatus=result.rows[0].status;
            sql=
            'select op.product_id , op.quantity from order_products as op inner join orders as o on o.id =op.order_id where o.user_id=$1 and status =$2';
            result=await con.query(sql,options);
            if(!result.rows.length){
                return userOrder;
            }
            sql=
            'select p.id as productId ,pp.quantity as quantity , pp.quantity *p.price as cost from products as p inner join (select op.product_id , op.quantity from order_products as op inner join orders as o on o.id =op.order_id where o.user_id=$1 and status =$2) as pp on p.id=pp.product_id';
            result=await con.query(sql,options);
            userOrder.products=result.rows;
            sql=
            'select sum(cost) as cost from (select p.id as productId ,pp.quantity as quantity , pp.quantity *p.price as cost from products as p inner join (select op.product_id , op.quantity from order_products as op inner join orders as o on o.id =op.order_id where o.user_id=$1 and status =$2) as pp on p.id=pp.product_id) as total';
            result= await con.query(sql,options);
            userOrder.totalCost=result.rows[0].cost;
            con.release();
            return userOrder;
        }
        catch(error){
            throw error;
        }
    }
}

const dashboard=new Dashboard();
export default dashboard;
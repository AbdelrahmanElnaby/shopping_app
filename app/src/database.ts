import dotenv from "dotenv"
import {Pool} from "pg" 

dotenv.config();

const{
    POSTGRES_HOST,
    POSTGRES_DB,
    POSTGRES_USER, 
    POSTGRES_PASSWORD,
    env} = process.env;

const client=new Pool({
    host:POSTGRES_HOST,
    database:POSTGRES_DB,
    user:POSTGRES_USER,
    password:POSTGRES_PASSWORD

});

export default client;
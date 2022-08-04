import express from "express"
import bodyParser from "body-parser"
import routes from "./routes/index"

const app=express();

// parse the request json body to javascript object
app.use(bodyParser.json());


app.use("/store",routes);
// initialize the port and host
const port:number=3000;
const host:string="localhost";

// create the server
app.listen(port,host,()=>{
    console.log(`server is running on port 0.0.0.0.${port}`);
});
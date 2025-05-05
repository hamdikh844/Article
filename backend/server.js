require('dotenv').config({ path: __dirname + '/.env' });
const express=require("express")
const mongoose=require("mongoose")

const connectdb=require("./dbconnect/db");
connectdb();
console.log('Loaded ENV:', process.env.MONGODB_URI);



const app=express()
app.use(express.json())


const port=process.env.PORT || 3000;

app.listen(port ,()=>{
    console.log(`the server runninig with the port ${port}`)
})
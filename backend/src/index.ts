import  express  from "express";
import dotenv from 'dotenv'

dotenv.config()
const app = express()
const PORT = process.env.PORT

import connectDB from "./config/db";
connectDB()

app.listen(PORT, ()=>{ 
    console.log(`Server running on the port ${PORT}`)
})
//npm i -D ts-node-dev => To directly run the TS file in backend
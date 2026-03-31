import  express  from "express";
import dotenv from 'dotenv'

dotenv.config()
const app = express()
const PORT = process.env.PORT

import connectDB from "./config/db";
connectDB()

import routes from "./Routes/router";
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api/v1', routes)

app.listen(PORT, ()=>{ 
    console.log(`Server running on the port ${PORT}`)
})

//npm i -D ts-node-dev => To directly run the TS file in backend


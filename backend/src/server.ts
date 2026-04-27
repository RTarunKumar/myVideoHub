import  express  from "express";
import connectDB from "./config/db";
import dotenv from 'dotenv'
import cors from 'cors'

import passportJwtStretegy from './config/passportJwtStrategy'

const app = express()
dotenv.config()
connectDB()

app.use(passportJwtStretegy.initialize())
const corsOptions = {
    origin:['http://localhost:5173'],
    optionsSuccessStatus: 200,
}
app.use(cors(corsOptions))

const PORT = process.env.PORT || 8000

import routes from "./Routes/router";
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api/v1', routes)

app.listen(PORT, ()=>{ 
    console.log(`Server running on the port ${PORT}`)
})

//npm i -D ts-node-dev => To directly run the TS file in backend


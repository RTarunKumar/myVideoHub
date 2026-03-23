import  express  from "express";

const app = express()
const PORT = 8080

app.listen(PORT, ()=>{
    console.log(`Server running on the port ${PORT}`)
})
//npm i -D ts-node-dev => To directly run the TS file in backend
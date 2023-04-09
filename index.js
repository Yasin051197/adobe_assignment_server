
const {connection}=require("./Config/db");
const express=require("express")
const cors=require("cors")
const UserRouter = require("./Routes/users.route")
const PostRouter = require("./Routes/posts.route")

const app=express()
app.use(express.json())
app.use(cors({origin:"*"}))
app.use("/",UserRouter)
app.use("/",PostRouter)

app.get("/",(req,res)=>{
    res.send("Home")
})
app.listen(8080,async()=>{

    try{
         await connection;
         console.log("connected");
    }
    catch(err){
        console.log(err);
    }

    console.log("server is running on 8080")
})
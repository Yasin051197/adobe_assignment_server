const express=require("express")

const app=express()

app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Home")
})
app.listen(8080,()=>{
    console.log("running on port 8080")
})
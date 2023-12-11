const express = require("express")
const app = express()
const path = require("path")
const collection = require("./mongodb")

app.use(express.json())
app.set("view engine", "hbs")
app.set("views", templatePath)
app.use(express.urlencoded({extended: false}))

app.get("/",(req, res) => {
    res.render("login")
})

app.get("/signup",(req, res) => {
    res.render("signup")
})

app.post("/signup",async(req, res) => {
    const data = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }
    await collection.insertMany([data])
    res.render("landing")
})

app.post("/login",async(req, res) => {
    try{
        const check = await collection.findOne({email: req.body.email})
        if(check.password === req.body.password){
            res.render("landing")
        }
        else{
            res.send("Wrong password")
        }
    }
    catch{
        res.send("Wrong details")
    }
})

app.listen(3000, ()=>{
    console.log("port connected");
})
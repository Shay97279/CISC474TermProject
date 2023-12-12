const express = require("express")
const app = express()
const path = require("path")
const port = 8080;
const collection = require("./mongodb")

$('#myModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
  })

app.use(function(req, res, next) {
    const { url, path: routePath } = req;
    console.log( 'Request: Timestamp:', new Date().toLocaleString(), ', URL (' + url + '), PATH (' + routePath + ').' );
    next();
});

app.use('/', express.static(path.join(__dirname, '')))
app.listen(port, () => {
    console.log(`Server running on port ${port}...`)
})

//mongodb connection

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


app.get("/",(req, res) => {
    res.render("login")
})

app.get("/signup",(req, res) => {
    res.render("signup")
})

app.post("/signup",async(req, res) => {
    const data = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
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
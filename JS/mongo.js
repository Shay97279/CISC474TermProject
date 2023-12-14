// const mongoose = require("mongoose")

// //change this
// mongoose.connect("mongodb://localhost:27017/").then(() => {
//     console.log("mongodb connected");
// })
// .catch(() => {
//     console.log("failed to connect");
// })

// const logIn = new mongoose.Schema({
//     firstName:{
//         type: String,
//         required: true
//     },
//     lastName:{
//         type: String,
//         required: true
//     },
//     email:{
//         type: String,
//         required: true
//     },
//     password:{
//         type: String,
//         required: true
//     }
// })

// const collection = new mongoose.model("Collection1", logIn)

// module.exports = collection
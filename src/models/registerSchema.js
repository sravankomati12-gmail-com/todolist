const mongoose = require('mongoose');
const new_mongoose = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    // number:{
    //     type:Number,
    //     required:true,
    //     // unique:true
    // },
    email:{
        type:String,
        required:true,
        // unique:true
    },
    password:{
        type:String,
        required:true
    },
})

const registerSchema = new mongoose.model("registerSchema",new_mongoose);
module.exports = registerSchema
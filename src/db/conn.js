const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://rajbirvision:123@cluster0.iejcl.mongodb.net/?retryWrites=true&w=majority",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
mongoose.connection.once("open",()=>{
    console.log('Mongoose is Connected')
})
mongoose.connection.on("error",(e)=>{
    console.log('Mongoose is Not Connected',e);
})

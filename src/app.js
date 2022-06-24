const express = require('express');
const app = express();
require('./db/conn')
const registerSchema = require('./models/registerSchema')
const ejs = require('ejs')
const path = require("path");
const port = process.env.PORT || 1000;

app.set("view engine", "ejs");



app.use(express.json());
app.use(express.urlencoded({ extended: false }));



app.get('/',(req,res)=>{
    registerSchema.find().exec((err,users)=>{
        if(err){
            res.json({message:err.message});
        } else{
            res.render("index",{
                title:"Home Page",
                users:users,
            })
        }
    })
})

app.get('/add',(req,res)=>{
    res.render('add_users',{title:'Add Users'})
})

app.post('/add',async(req,res)=>{
    try {
        const user = new registerSchema({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
        })
        const reg = await user.save();
        res.status(201).redirect('/')
    } catch (error) {
        res.status(401).send(error)
    }
})

app.get('/edit/:id',async(req,res)=>{
    let id = req.params.id;
    registerSchema.findById(id,(err,user)=>{
        if(err){
            res.redirect('/');
        } else{
            if(user == null){
                res.redirect('/')
            } else{
                res.render('edit_users',{
                    title:'Edit User',
                    user:user,
                })
            }
        }
    })
})    

app.post('/update/:id',async(req,res)=>{
    
        let id = req.params.id
        let regi = registerSchema.findByIdAndUpdate(id,{
            name:req.body.name,
            email:req.body.email,
            password:req.body.password
        },(err,result)=>{
            if(err){
                res.json({message:err.message, type:'danger'});
            } else{
                req.session = {
                    type:'success',
                    message:'User updated successfully',
                };
                // console.log(regi)
                res.redirect('/')
            }
        })        
})

app.get('/delete/:id',(req,res)=>{
    let id = req.params.id;
    registerSchema.findByIdAndRemove(id,(err,result)=>{
        if(err){
            res.json({message:err.message});
        } else{
            req.session = {
                type:'info',
                message:'User delete successfully'
            };
            res.redirect('/')
        }
    })
})






app.listen(port,()=>{
    console.log(`The Port is Running at ${port}`)
})  
const express = require('express')
const routers = express.Router()

const Product  = require('../produc')
const User  = require('../users')
const Cart  = require('../carts')



routers.get('/products',async (req,res)=>{

    try{
        const posts = await Product.find()
        res.json(posts)
    }catch(err){
        res.json({message:err})
    }
})
routers.post('/products', async (req,res)=>{

    const post = new Product({
        name:req.body.name,
        price:req.body.price,
        image:req.body.image,
        category:req.body.category,
        _id:req.body._id        
    })
    try{
        const savedPost = await post.save()
        res.json({success:true})
    }catch(err){
        res.json({success:false})
    }
})
routers.get('/carts',async (req,res)=>{
    try{
        const posts = await Cart.find({_id:"12341234"})
        res.json(posts)
    }catch(err){
        res.json({success:false})
    }
})
routers.post('/carts', async (req,res)=>{

    await  Cart.update({_id: "12341234"},{$set:{number:req.body.number}})
res.json({
success:true
})
})

routers.post('/products/update',async(req,res)=>{

    await Product.update({_id: req.body._id},{$set:{price:req.body.price ,
                                                    name:req.body.name,
                                                    image:req.body.image,
                                                    category:req.body.category}})
    res.json({
        success:true
    })
})
routers.post('/users/login',async(req,res)=>{
    const usr= await User.findOne({email: req.body.email,password:req.body.password})

    if(!usr){
        res.json({
            success:false,
        })
        return
    }

    res.json({
        success:true,
        userInfo:usr

    })
})


routers.get('/users',async (req,res)=>{
    try{
        const posts = await User.find()
        res.json(posts)
    }catch(err){
        res.json({message:err})
    }
})


routers.post('/users', async (req,res)=>{
    const post = new User({
        firsrName:req.body.firstName,
        lastName:req.body.lastName,
        city:req.body.city,
        street:req.body.street,
        password:req.body.password,
        email:req.body.email,
        logStatus:req.body.logStatus,
        userID:req.body.userID
    })

    try{
        const savedPost = await post.save()
        res.json({success:true})
    }catch(err){
        res.json({success:false})
    }
})

module.exports = routers
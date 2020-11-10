const express=require('express')
const app = express()
const mongoose=require('mongoose')
const postRoute = require('./routers/posts')
const bodyParser = require('body-parser')

// app.get('/',(req,res)=>{res.send("hello fuckers")})
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use('/posts',postRoute)
// app.get('/',(req,res)=>{res.send("hello moto")})

mongoose.connect('mongodb+srv://dbUser:dbUser@cluster0.knpvb.mongodb.net/dbUser?retryWrites=true&w=majority',
{ useNewUrlParser: true,useUnifiedTopology: true},
(err)=>console.log(err))



app.listen(3000) 
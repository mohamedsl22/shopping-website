const mongoose=require('mongoose')

const postProduct = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    
    price:{
        type:String,
        required:true
    },
    
    image:{
        type:String,
        required:true
    },

    category:{
        type:String,
        required:true
    },
    _id:{
        type:String,
        required:true
    }
    
})

module.exports = mongoose.model('ProductItem',postProduct)
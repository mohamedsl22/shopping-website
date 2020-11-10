const mongoose=require('mongoose')

const postCart = mongoose.Schema({
    number:{
        type:Number,
        required:true
    },
    _id:{
        type:String,
        required:true
    }
    
})

module.exports = mongoose.model('CarstNum',postCart)
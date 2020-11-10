const mongoose=require('mongoose')

const postUser = mongoose.Schema({
    firsrName:{
        type:String,
        required:true
    },
    
    lastName:{
        type:String,
        required:true
    },
    
    city:{
        type:String,
        required:true
    },

    street:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    logStatus:{
        type:Boolean
    },
    userID:{
        type:Number,
        required:true

    }

    
})

module.exports = mongoose.model('UserInfo',postUser)
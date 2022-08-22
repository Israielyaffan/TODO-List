const mongoose=require('mongoose')


const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type: String,
        required:true
    },
    isVerified:{
        type:Boolean,
      
    },
    emailToken:
    { 
        type:String,
    }

});

const User=mongoose.model("users",UserSchema)
module.exports=User
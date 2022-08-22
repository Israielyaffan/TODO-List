// const { BSONType } = require('mongodb');
const mongoose=require('mongoose')

const CommentSchema=new mongoose.Schema({
    postId:{
        type:Number,
        required:true
    },
    // commentId:{
    //     type:Number,
    // },
   
    text:{
        type: String,
        required:true
    },
    user:{
        type:String,
        required:true
    },
   pCommentId:{
    type:String,
    default:null
   }
    

});

const Comment=mongoose.model("post",CommentSchema)
module.exports=Comment
const mongoose=require('mongoose')


const TodoSchema=new mongoose.Schema({
    user:{
        type:String,
        required:true
    },
    // commentId:{
    //     type:Number,
    // },
    text:{
        type: String,
        required:true
    },
    isCompleted:{
        type:Boolean,
        default:false
    }
    

});

const List=mongoose.model("todo",TodoSchema)
module.exports=List
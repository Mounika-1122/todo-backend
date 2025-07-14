const mongoose=require('mongoose');
const todoSchema= new mongoose.Schema({
    taskName: {
        type: String,
        required: true,
        unique: false
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})

const todoModel=mongoose.model('todo', todoSchema);
module.exports={
    todoModel
}
const { todoModel } = require("../models/todoModel");

const getAllTodo = async (req, res) => {
    try {
        let todoTasks = await todoModel.find();

        return res.status(200).json({
            status: 1,
            message: 'Todotasks filtered successfully',
            data: todoTasks
        });
    } catch (error) {
        const errorMessage = error.message || JSON.stringify(error);
        console.error('Error in todoController', errorMessage);
        return res.status(500).json({
            status: 0,
            message: `Error in fetching todos : ${errorMessage}`
        });
    }
};

const getTodoByIdController = async (req, res) => {
    try {
        const id = req.params.id;

        // validation
        if (!id) {
            throw new Error('Id is missing!');
        }

        let todo = await todoModel.find({ _id: id });

        return res.status(200).json({
            status: 1,
            message: 'Todo filtered successfully',
            data: todo
        });
    } catch (error) {
        const errorMessage = error.message || JSON.stringify(error);
        console.error('Error in todoController', errorMessage);
        return res.status(500).json({
            status: 0,
            message: `Error in fetching todo : ${errorMessage}`
        });
    }
};

const deleteTodoByIdController=async (req,res)=>{
    try{
        const id=req.params.id;
        if(!id){
            throw new error('Id is missing!');
        }
        let deletedTodo = await todoModel.findByIdAndDelete(id);
        return res.status(200).json({
            status : 1,
            message : "Deleted task successfully",
            data : deletedTodo
        })

    } catch(error){
        const errorMessage = error.message || JSON.stringify(error);
        console.error('Error in todoController', errorMessage);
        return res.status(500).json({
            status: 0,
            message: `Error in deleting todo : ${errorMessage}`
    })

}}

const updateTodoByIdController =async(req, res) =>{
    try{
        const id=req.params.id;
        const { taskName } = req.body;
        
        if(!id){
            throw new error("Id is missing");
        }

        if(!taskName){
            throw new error("Task name cannot be empty");
        }
        const updatedTodo= await todoModel.findByIdAndUpdate(
            id,
            {taskName},
            {new : true, runValidators: true}
        );

        if (!updatedTodo) {
            return res.status(404).json({
                status: 0,
                message: "Todo not found!"
            });
        }

        return res.status(200).json({
            status: 1,
            message: "Todo updated successfully",
            data: updatedTodo
        });
    } catch(error){
        const errorMessage = error.message || JSON.stringify(error);
        console.error("Error in updateTodoByIdController:", errorMessage);
        return res.status(500).json({
            status: 0,
            message: `Error in updating todo: ${errorMessage}`
        });
    }

    }


const createTodoController =async (req, res)=>{
    try{
        const taskName =req.body?.taskName;
        //validation
        if(!taskName){
            throw new Error('Empty TaskName not allowed!');
        }
        const newTodoInstance=new todoModel({
            'taskName': taskName
        });

         const todo=await newTodoInstance.save();
         
         return res.status(200).json({
            status: 1,
            message: 'New task created',
            data:todo
         })
         
    }
    catch(error){
        const errorMessage = error.message || JSON.stringify(error);
        console.error('Error in craeteController', errorMessage);
        return res.status(500).json({
            status: 0,
            message: `Error in creating todo : ${errorMessage}`
        });
    }
}


module.exports = {
    getAllTodo,
    getTodoByIdController,
    createTodoController,
    deleteTodoByIdController,
    updateTodoByIdController
};

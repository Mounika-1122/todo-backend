const express=require('express');
const router=express.Router()
const {getAllTodo, 
    getTodoByIdController,
    createTodoController,
    deleteTodoByIdController,
    updateTodoByIdController
}= require('../controllers/todoController')

//to fetch all todos
router.get('/', getAllTodo); 

//to fetch by id
router.get('/:id', getTodoByIdController);

//create todo
router.post('/create', createTodoController);

//delete todo
router.delete('/delete/:id', deleteTodoByIdController);

//update todo
router.put('/:id', updateTodoByIdController);

module.exports= router;
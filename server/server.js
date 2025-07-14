const express=require('express');
// const userRouter=require('./routes/usersRoute');
// const contactUser=require('./routes/contactRoutes');
const {todoModel}=require('./models/todoModel');
const mongoose=require('mongoose');
const cors=require('cors');
const todoRouter=require('./routes/todoRoute');
const app=express();
require('dotenv').config();

const port=process.env.PORT;

app.use(express.json());
app.use(cors());

app.get('/', (req,res) =>{
    res.status(200).json({
        "message":"server is up"});
});

app.use('/todos', todoRouter);
mongoose.connect(process.env.DATABASE_URL,  
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=>{
        console.log("MongoDB connected successfully!");
        app.listen(port, ()=>{
            console.log(`server running on ${port}`);
        });


    }).catch((error)=>{
        console.error('error in connecting to mom=ngodb',error);
    });

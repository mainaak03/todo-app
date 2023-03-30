import express from "express";
import cors from "cors"
import mongoose from "mongoose";
import morgan from "morgan";
import dotenv from "dotenv";
import Todo from "./models/todo.js";

// SETUP

const app=express();

dotenv.config();

app.use(express.json());
app.use(cors());
app.use(morgan("common"));

const PORT=process.env.PORT;

// DATABASE SETUP

mongoose
    .connect(process.env.MONGO_URL, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
    .then(() => {console.log("Connected to database.");})
    .then(() => {
        app.listen(PORT, () => {console.log("Server started on port "+PORT)});
    })
    .catch((err) => {console.log(err);})

// ROUTES SETUP

app.get("/todos", async (req,res) => {
    const todos=await Todo.find();

    res.status(200).json(todos);
});

app.post("/todo/new", async (req,res) => {
    const todo=new Todo({
        todoText: req.body.text
    });
    todo.save();
    res.status(200).json(todo);
});

app.delete("/todo/delete/:id", async (req,res) => {
    const newTodos=await Todo.findByIdAndDelete(req.params.id);
    
    res.status(200).json(newTodos);
});

app.put("/todo/complete/:id", async (req,res) => {
    const todo=await Todo.findById(req.params.id);
    todo.completed=!todo.completed;

    todo.save();

    res.status(200).json(todo);
});
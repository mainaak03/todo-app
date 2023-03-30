import mongoose from "mongoose";

const TodoSchema=new mongoose.Schema(
    {
        todoText: {
            type: String,
            required: true
        },
        completed: {
            type: Boolean,
            default: false
        }
    },
    {timestamps: true}
)

const Todo=mongoose.model("Todo", TodoSchema);
export default Todo;
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
let oldStyle={textDecorationLine:"line-through"};

export default function TodoList() {
    let [todos, setTodos] = useState([{task:"set-task",id:uuidv4(),isDone:false}]);
    let [newTodos, setNewTodos] = useState(""); // step 2 yaha name aa chuka hai

    function addNewTask() {
        if (newTodos.trim() !== "") {  // Check if input is not empty
            // setTodos([...todos, {task:newTodos,id:uuidv4()}]);
            setTodos((prevTodo)=>{
                return [...prevTodo,{task:newTodos,id:uuidv4(),isDone:false}];
            });
            setNewTodos("");  // Clear the input field after adding
        }
    }
    let update = (event) => {
        setNewTodos(event.target.value);
    };
    let deleteTodo=(id)=>{
        setTodos(todos.filter((prevTodo)=>prevTodo.id!=id));
    };
    let upper=()=>{
        setTodos(todos.map((todo)=>{
            return{
                ...todo,task:todo.task.toUpperCase()
            }
        }))
    }
    let upperOne=(id)=>{
        setTodos((prevTodo)=>
            prevTodo.map((todo)=>{
                if(todo.id==id){
                    return {
                        ...todo,task:todo.task.toUpperCase()
                    }
                }
                else{
                    return todo
                }
            })
        )
    }
    let done=(id)=>{
        let arr = [];
        todos.forEach((todo) => {
            if(todo.id == id){
                todo.isDone = true;
            }
            arr.push(todo);
        })
        setTodos(arr);
        console.log(arr)
    
    };
    return (
        <div>
            <input 
                type="text" 
                placeholder="add task" 
                value={newTodos} 
                onChange={update} // step 1
            />
            {/* step 3 */}
            <button onClick={addNewTask}>Add</button> 
            <br />
            <br />
            <ul>
                {
                    todos.map((todo) => (
                        <li 
                        key={todo.id}>
                        <span style={todo.isDone?oldStyle:null}>{todo.task}</span>
                        &nbsp;&nbsp;
                        <button onClick={()=>deleteTodo(todo.id)}>Delete</button>
                        &nbsp;&nbsp;
                        <button onClick={()=>upperOne(todo.id)}>Uppercase !</button>
                        &nbsp;&nbsp;
                        <button onClick={()=>done(todo.id)}>Is Done !</button>
                        </li>  // Added a key prop to each list item
                    ))
                }
            </ul>
            <br></br><br></br>
            <button onClick={upper}>Uppercase All !</button>
        </div>
    );
}
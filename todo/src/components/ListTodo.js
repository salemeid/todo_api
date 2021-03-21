import React, {useState, useEffect} from 'react';
import EditTodo from './EditTodo';

const ListTodo = () => {


    // Delete function 
    const deleteTodo = async (id) => {
        try {
                await fetch(`http://localhost:3001/todos/${id}`,{
                method: "DELETE"
            });
            
            setTodos(todos.filter(todo => todo.todo_id !== id));
        } catch (err) {
            console.error(err.message);
        }
    }



    const [ todos, setTodos ] = useState([])

    const getTodos = async () => {
        try {
            const response = await fetch("http://localhost:3001/todos");
            const jsonData = await response.json();

            setTodos(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() =>{
        getTodos();
    },[]);

    //make one request add []

    return(
        <>
            <table className="table table-striped mt-5 text-center">
                <thead>
                <tr>
                    <th>Description</th>
                    <th>EDIT</th>
                    <th>DELETE</th>
                </tr>
                </thead>
                <tbody>
                {/* <tr>
                    <td>John</td>
                    <td>Doe</td>
                    <td>john@example.com</td>
                </tr> */}

                {todos.map(todo => (
                    <tr key={todo.todo_id}>
                        <td>{todo.descriptions}</td>
                        <td><EditTodo todo= {todo}/></td>
                        <td><button className="btn btn-danger" onClick={()=> deleteTodo(todo.todo_id)}>Delete</button></td>
                    </tr>
                ))}
                </tbody>
            </table>   
        </>
    )
}

export default ListTodo;

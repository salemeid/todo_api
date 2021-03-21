import React, { useState } from 'react';

const EditTodo = ({todo}) => {
    const [descriptions, setDescrtiption] = useState(todo.descriptions);
    //edit description function 

    const updateDescription = async(e) => {
        e.preventDefault()
        try {
            const body = { descriptions};
            const response = await fetch (`http://localhost:3001/todos/${todo.todo_id}`,{
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });

            window.location = "/";
        } catch (err) {
            console.error(err.meassage);
        }
    }
    return(
        <>
        
                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#id${todo.todo_id}`} >
                Edit
                </button>

        
                <div className="modal fade" id={`id${todo.todo_id}`} onClick={()=> setDescrtiption(todo.descriptions)} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Edit Todo</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={()=> setDescrtiption(todo.descriptions)}></button>
                    </div>
                    <div className="modal-body">
                    <input type="text" className="form-control" value={descriptions} onChange={(e)=> setDescrtiption(e.target.value)}/>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={()=> setDescrtiption(todo.descriptions)}>Close</button>
                        <button type="button" className="btn btn-primary"  onClick= {e => updateDescription(e)}>Save changes</button>
                    </div>
                    </div>
                </div>
                </div>


        </>
    )
}


export default EditTodo;
import React, {useState} from 'react';

const InputTodo = () => {
    
    const [descriptions, setDescriptions] = useState("");

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const body = {descriptions};
            const response = await fetch("http://localhost:3001/todos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            // refresh the page
            window.location ="/";
        } catch (err) {
            console.error(err.message);
        }
    }

    return(
        <>
            <h1 className="text-center mt-5"> Salem's ToDo List</h1>
            <form className="d-flex mt-5" onSubmit={onSubmitForm} > 
                <input type="text" className="form-control" value={descriptions} onChange={e => setDescriptions(e.target.value)}/>
                <button className="btn btn-success">Add</button>
            </form>
        </>
    )
}

export default InputTodo;

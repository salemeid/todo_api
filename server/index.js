const express = require ("express");
const cors = require ("cors");
const pool = require ("./db");

const app = express();
app.use(cors());
app.use(express.json()); //req.body 


//ROUTES//


//create a todo
app.post("/todos", async (req, res) => {
    try {
        const {descriptions} = req.body;
        const newTodo = await pool.query("INSERT INTO todo (descriptions) VALUES($1) RETURNING *", [descriptions]);
        res.json(newTodo.rows[0])
    } catch (err){
        console.error(err.message);
    }
})

//get all todos

app.get("/todos", async (req,res)=> {
    try{
         const allTodos = await pool.query("SELECT * FROM todo");
         res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }

})
//get a todo

app.get("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const aTodo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);
        res.json(aTodo.rows[0]);
    } catch (err) { console.error(err.message);}
})
//update a todo

app.put("/todos/:id", async(req,res) => {
    try {
        const { id } = req.params;
        const {descriptions} = req.body;
        const updateTodo = await pool.query("UPDATE todo SET descriptions = $1 WHERE todo_id = $2",[descriptions, id])
        res.json("todo was updated!")
    } catch (err) {
        console.error(err.meassage);
    }
})

//delete a todo
app.delete("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);

        res.json("Todo was deleted!");
    } catch (err) {
        console.error(err.message);
    }
})


app.listen(3001, ()=> {
    console.log("server started on port 3001");
});

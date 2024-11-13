const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 添加请求体解析日志中间件
app.use((req, res, next) => {
    if (req.method === 'POST') {
        console.log('Request Headers:', req.headers);
        console.log('Request Body:', req.body);
    }
    next();
});

// 在路由之前添加日志中间件
app.use((req, res, next) => {
  if (req.method === 'POST') {
    console.log('=== Incoming POST Request ===');
    console.log('Headers:', req.headers);
    console.log('Body:', req.body);
    console.log('==========================');
  }
  next();
});

//ROUTES//

// 在现有路由之前添加
app.get("/", (req, res) => {
  res.json({ message: "Welcome to IDWD API" });
});

app.get("/health", async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({
      status: "UP",
      timestamp: result.rows[0].now,
      database: "Connected"
    });
  } catch (err) {
    res.status(500).json({
      status: "DOWN",
      error: err.message
    });
  }
});

//create a todo
app.post("/todos", async (req, res) => {
  try {
    console.log('=== Processing POST /todos ===');
    console.log('Request body:', req.body);
    
    const { title, description } = req.body;
    
    // 验证标题
    if (!title || typeof title !== 'string' || title.trim() === '') {
      console.log('Invalid title:', { title, type: typeof title });
      return res.status(400).json({
        error: 'Invalid title',
        received: { title, type: typeof title }
      });
    }

    // 执行插入
    console.log('Inserting todo:', { title, description });
    const newTodo = await pool.query(
      "INSERT INTO todos (title, description) VALUES ($1, $2) RETURNING *",
      [title.trim(), description ? description.trim() : '']
    );

    console.log('Successfully created todo:', newTodo.rows[0]);
    res.json(newTodo.rows[0]);
    
  } catch (err) {
    console.error('=== Error in POST /todos ===');
    console.error('Error:', err.message);
    console.error('Stack:', err.stack);
    console.error('Request body:', req.body);
    console.error('===========================');
    
    res.status(500).json({ error: err.message });
  }
});

//get all todos
app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todos");
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

//get a todo
app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todos WHERE id = $1", [
      id
    ]);

    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

//update a todo
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    const updateTodo = await pool.query(
      "UPDATE todos SET title = $1, description = $2, completed = $3, updated_at = CURRENT_TIMESTAMP WHERE id = $4 RETURNING *",
      [title, description, completed, id]
    );

    res.json(updateTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

//delete a todo
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM todos WHERE id = $1", [
      id
    ]);
    res.json({ message: "Todo was deleted!", success: true });
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

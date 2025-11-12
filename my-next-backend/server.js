const cors = require("cors"); // اضافه کردن CORS
const express = require("express");
const app = express();
const PORT = 5000;

// Middleware to parse JSON

app.use(cors()); // اجازه اتصال فرانت‌اند
app.use(express.json()); // برای خواندن JSON


// ===== In-memory ToDo data =====
let todos = [
  { id: 1, text: "Learn Next.js", done: false },
  { id: 2, text: "Build backend API", done: false },
];

// ===== API Routes =====

// 1️⃣ Get all todos
app.get("/api/todos", (req, res) => {
  res.json(todos);
});

// 2️⃣ Add a new todo
app.post("/api/todos", (req, res) => {
  const { text } = req.body;
  const newTodo = { id: Date.now(), text, done: false };
  todos.push(newTodo);
  res.json(newTodo);
});

// 3️⃣ Toggle todo status
app.put("/api/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  todos = todos.map((t) =>
    t.id === id ? { ...t, done: !t.done } : t
  );
  res.json({ success: true });
});

// 4️⃣ Delete a todo
app.delete("/api/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  todos = todos.filter((t) => t.id !== id);
  res.json({ success: true });
});

// ===== Test route =====
app.get("/", (req, res) => {
  res.send("Server is running! 🚀");
});

// ===== Start server =====
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

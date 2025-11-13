const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;

// ===== CORS =====
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
}));

// ===== Middleware =====
app.use(express.json());

// ===== In-memory ToDo data =====
let todos = [
  { id: 1, text: "Learn Next.js", done: false },
  { id: 2, text: "Build backend API", done: false },
];

// ===== API Routes =====

// Get all todos
app.get("/api/todos", (req, res) => {
  res.json(todos);
});

// Add a new todo
app.post("/api/todos", (req, res) => {
  const { text } = req.body;
  const newTodo = { id: Date.now(), text, done: false };
  todos.push(newTodo);
  res.json(newTodo);
});

// Toggle todo
app.put("/api/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  todos = todos.map(t => t.id === id ? { ...t, done: !t.done } : t);
  res.json({ success: true });
});

// Delete todo
app.delete("/api/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  todos = todos.filter(t => t.id !== id);
  res.json({ success: true });
});

// Test route
app.get("/", (req, res) => {
  res.send("Server is running! 🚀");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

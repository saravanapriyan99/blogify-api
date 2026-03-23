const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Users data store
let users = [
  { id: 1, name: 'Alice', role: 'Developer' },
  { id: 2, name: 'Bob', role: 'Designer' },
  { id: 3, name: 'Charlie', role: 'Manager' }
];

// Home route - HTML
app.get('/', (req, res) => {
  res.send('<h1>Welcome to My First API!</h1><p>Server is running successfully.</p>');
});

// API route - JSON (GET)
app.get('/api/users', (req, res) => {
  res.json(users);
});

// API route - JSON (POST) - Add new user with auto-generated ID
app.post('/api/users', (req, res) => {
  const { name, role } = req.body;
  // Auto-generate ID (autofill)
  const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
  // Auto-fill defaults if not provided
  const newUser = {
    id: newId,
    name: name || 'Unknown',
    role: role || 'User'
  };
  users.push(newUser);
  res.status(201).json({ message: 'User created successfully', user: newUser });
});

// Route with query parameters (GET)
app.get('/api/greet', (req, res) => {
  const name = req.query.name || 'Guest';
  res.send(`Hello, ${name}!`);
});

// Route with query parameters (POST) - Auto-fill name
app.post('/api/greet', (req, res) => {
  const { name } = req.body;
  // Autofill with 'Guest' if name is not provided
  const filledName = name || 'Guest';
  res.json({ message: `Hello, ${filledName}!` });
});

// Route with status and JSON (GET)
app.get('/api/status', (req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date()
  });
});

// Route with status and JSON (POST) - Auto-fill status
app.post('/api/status', (req, res) => {
  const { status } = req.body;
  // Autofill with 'online' if status is not provided
  const filledStatus = status || 'online';
  res.json({
    status: filledStatus,
    timestamp: new Date()
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// app.js
const express = require('express');
const taskRouter = require('./routes/task');
const authRouter = require('./routes/auth');
const app = express();

app.use(express.json());

app.use('/auth', authRouter);

app.use('/tasks', taskRouter);

// Route de santé
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
const express = require('./expressapp/node_modules/express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use((req, res, next) => {
  const logData = `${new Date().toISOString()} - ${req.method} ${req.url}\n`;
  fs.appendFile('server.log', logData, (err) => {
      if (err) console.error('Error writing to server.log:', err);
  });
  next();
});

app.use(express.static(path.join(__dirname, 'pages')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', '*.html'));
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});

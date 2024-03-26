const express = require('./expressapp/node_modules/express');
const fs = require('fs');
const bodyParser = require('./expressapp/node_modules/body-parser');

const app = express();
const PORT = 3003;

app.use(bodyParser.json());

app.get('/users', (req, res) => {
  fs.readFile('./static/users.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading users.json:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    const users = JSON.parse(data).users;
    res.json(users);
  });
});

app.get('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  
  fs.readFile('./static/users.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading users.json:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    const users = JSON.parse(data).users;
    const user = users.find(u => u.id === userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  });
});

app.post('/users', (req, res) => {
  const newUser = req.body;
  console.log(newUser)
  fs.readFile('./static/users.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading users.json:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    const users = JSON.parse(data).users;
    newUser.id = users.length + 1;
    users.push(newUser);

    fs.writeFile('./static/users.json', JSON.stringify({ users }), (err) => {
      if (err) {
        console.error('Error writing to users.json:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      res.json(newUser);
    });
  });
});

app.put('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const updatedUser = req.body;

  fs.readFile('./static/users.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading users.json:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    let users = JSON.parse(data).users;
    const index = users.findIndex(u => u.id === userId);

    if (index === -1) {
      return res.status(404).json({ error: 'User not found' });
    }

    users[index] = { ...users[index], ...updatedUser };

    fs.writeFile('./static/users.json', JSON.stringify({ users }), (err) => {
      if (err) {
        console.error('Error writing to users.json:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      res.json(users[index]);
    });
  });
});

app.delete('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);

  fs.readFile('./static/users.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading users.json:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    let users = JSON.parse(data).users;
    const index = users.findIndex(u => u.id === userId);

    if (index === -1) {
      return res.status(404).json({ error: 'User not found' });
    }

    const deletedUser = users.splice(index, 1)[0];

    fs.writeFile('./static/users.json', JSON.stringify({ users }), (err) => {
      if (err) {
        console.error('Error writing to users.json:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      res.json(deletedUser);
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
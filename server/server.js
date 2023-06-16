const express = require('express');
const app = express();
const PORT = 9000;

app.use(express.json())

const { createUser, loginUser } = require('./handler/users');

app.post('/signup', createUser);
app.post('/login', loginUser);

app.listen(PORT, () => {
  console.log(`Teriyaki server on port ${PORT}`);
});

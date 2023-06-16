const express = require('express');
const app = express();
const PORT = 9000;

app.use(express.json())

const { createUser } = require('./handler/users');

app.post('/signup', createUser);

app.listen(PORT, () => {
  console.log(`Teriyaki server on port ${PORT}`);
});

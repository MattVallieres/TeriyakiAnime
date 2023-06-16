const express = require('express');
const app = express();
const PORT = 9000;

app.use(express.json())

app.listen(PORT, () => {
  console.log(`Teriyaki server on port ${PORT}`);
});

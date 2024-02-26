const express = require('express');
const app = express();
const router = require('./router.js');

const {dbConnection} = require('./model/db.js');
const port = 3090;
app.use(express.json());

app.use(router);

(async () => app.listen(port, async () => {
  try {
    await dbConnection();
    console.log(`Server running on port http://127.0.0.1:${port} 🛜`);
  } catch (error) {
    console.log(error);
  }
})
)();

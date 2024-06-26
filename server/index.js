const express = require('express');
const router = require('./router.js');
const bodyParser = require('body-parser');
const cors = require('cors');

const {dbConnection} = require('./model/db.js');
const app = express();
const port = 3090;

app.use(cors());

app.use(express.json());
app.use(bodyParser.json())

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

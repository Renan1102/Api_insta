
require('dotenv').config();
require('./database/index');
const routes = require('./routes');
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);


const {PORT} = process.env; // port que está rodando no .env 
app.listen(PORT, () =>{
  console.log(`server is on in port ${PORT}`);
});

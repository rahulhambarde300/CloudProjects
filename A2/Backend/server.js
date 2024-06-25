const express = require('express');
const router = require('./src/routes');

const app = express();

  
app.use(express.json());

app.use('/', router);

app.listen(80, ()=>{
    console.log("Server listening on port 80");
})


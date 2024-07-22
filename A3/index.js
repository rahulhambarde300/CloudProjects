const express = require('express')
const app = express()
const md5 = require("md5");
const port = 3000
const { createHash } = require('crypto');
const bcrypt = require('bcrypt');

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/md5-hash', (req, res) => {
    const hash = md5(req.body.value);
    res.send(hash);
})

app.post('/sha256-hash', (req, res) => {
    const hash = createHash('sha256').update(req.body.value).digest('base64');
    res.send(hash);
})

app.post('/bcrypt-hash', (req, res) => {
    const costFactor = 12;
    const salt =  bcrypt.genSalt(costFactor);
    const bcryptHash =  bcrypt.hash(input, salt);
    res.send(hash);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
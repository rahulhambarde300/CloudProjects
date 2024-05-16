const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 6000;
app.use(express.json());

app.listen(PORT, ()=> {
    console.log(`Server is listening on port ${PORT}`)
})

app.use(
    cors({
      origin: "*",
      credentials: true,
    })
  );
  
const http = axios.create({
    baseURL: 'http://container2:7000'
});

app.post('/calculate', (req, res)=>{
    console.log(`Request object is ${req.body}`);
    //Check that request body has required objects
    const request = req.body;
    if(request.file && request.file != "" && request.product && request.product != ""){
        //The request is valid, make call to container 2
        return http.post('/container2/calculate', request)
            .then((resp)=>{
                return res.status(200).json(resp.data)
            })
            .catch((err)=>{
                console.error(err);
                return res.status(400).json(err.response)
            })

        ;
    }
    else{
        err = {
            "file": request.file ? request.file : null,
            "error": "Invalid JSON input"
        }
        return res.status(400).json(err);
    }
})
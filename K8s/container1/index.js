const express = require('express');
const cors = require('cors');
const axios = require('axios');
const fs = require('fs');

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
    baseURL: 'http://localhost:6001'
});

app.post('/store-file', (req, res) => {
    console.log(`Request object is ${req.body}`);
    //Check that request body has required objects
    const request = req.body;
    if(!request.file){
        const resp = {
            file: null,
            error: "Invalid JSON input."
            }
        return res.status(400).json(resp)
    }

    try{
        const filePath = `/rahul_PV_dir/${request.file}`;
        fs.writeFile(filePath, request.data, err => {
            if(err){
                console.error('Error writing file:', err);
                const resp = {
                    file: request.file,
                    error: "Error while storing the file to the storage."
                    }
                return res.status(400).json(resp)
            }else{
                //File written successfully
                console.log('File written successfully to', filePath);
                const resp = {
                    file: request.file,
                    message: "Success."
                    }
                return res.status(200).json(resp)
            }
        });
    }
    catch(err){
        console.log(err);
        const resp = {
            file: request.file,
            error: "Error while storing the file to the storage."
            }
        return res.status(400).json(resp)
    }

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
            "error": "Invalid JSON input."
        }
        return res.status(400).json(err);
    }
})
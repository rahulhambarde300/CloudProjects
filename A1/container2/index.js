const express = require('express');
const fs = require('fs');

const app = express();
const PORT = 6001;
app.use(express.json());

app.listen(PORT, ()=> {
    console.log(`Server is listening on port ${PORT}`)
})

app.post('/container2/calculate', (req, res)=>{;
    //Check that request body has required objects
    const request = req.body;
    try{
        fs.readFile("volume/" + request.file, "utf8", (err, data) => {
            if(err) {
                //File not found
                const err_res = {
                    "file": request.file,
                    "error": "File not found."
                }
                return res.status(200).json(err_res);
            }

            data = data.replaceAll("\r","");
            //File found, now parse it
            //Get each line
            const file_invalid_res = {
                "file": request.file,
                "error": "Input file not in CSV format."
            }

            let entryArr = data.trim().split("\n");
            const hashmap = new Map();
            for(let i = 0; i < entryArr.length; i++){
                const entry = entryArr[i].trim().split(",")
                if(entry.length == 0){
                    continue;
                }
                if(entry.length != 2){
                    return res.status(200).json(file_invalid_res);
                }

                const product = entry[0].trim();
                const count = parseInt(entry[1].trim());

                if(hashmap.has(product)){
                    hashmap.set(product, hashmap.get(product) + count);
                }
                else{
                    hashmap.set(product, count);
                }

                
            }
            const success_res = {
                "file": request.file,
                "sum": hashmap.get(request.product)
            }

            return res.status(200).send(success_res);
        });
    } catch (err){
        console.error(err);
        return err;
    }
    
    
})
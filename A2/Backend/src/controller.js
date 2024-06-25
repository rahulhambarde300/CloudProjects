const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();

const connection = mysql.createConnection({
    host     : process.env.RDS_HOSTNAME,
    user     : process.env.RDS_USERNAME,
    password : process.env.RDS_PASSWORD,
    port     : process.env.RDS_PORT,
    typeCast: function (field, next) {
        if (field.type === "TINY" && field.length === 1) {
            return field.string() === '1';
        }
        return next();
    }
});

connection.connect(function(err) {
    if (err) {
      console.error('Database connection failed: ' + err.stack);
      return;
    }
  
    console.log('Connected to database.');
    connection.query("DROP DATABASE a2;",  (err, res) => {
        if(err){
            throw err;
        } 

        console.log('Dropped a2 DB', res);
    });
    connection.query("CREATE DATABASE a2;",  (err, res) => {
        if(err){
            throw err;
        } 

        console.log('Database created', res);
    });
    connection.query("USE a2;",  (err, res) => {
        if(err){
            throw err;
        } 

        console.log('Using a2 DB', res);
    });

    connection.query("CREATE TABLE products (name varchar(100), price varchar(100),availability boolean)",  (err, res) => {
        if(err){
            throw err;
        } 

        console.log('Table created', res);
    });
});

const storeProduct = async(req, res) => {
    
    const prductEntries = req.body.products;
    const rows = prductEntries.map(product => [
        product.name,
        product.price,
        product.availability
      ]);
    connection.query('INSERT INTO products(name, price, availability) VALUES ?', [rows], (err, res) => {
        if(err){
            res.status(400).send(err);
            throw err;
        } 

        console.log('Last insert ID:', res.insertId);
    });
    const response = {
        "message": "Success."
    }
    res.status(200).send(response);
}

const listProducts = async(req, res) => {
    connection.query('SELECT * FROM products', (err,rows) => {
        if(err) throw err;
      
        console.log('Data received from Db:');
        console.log(rows);
        res.send({products:rows});
    });
    // res.send("Hello");
}

module.exports = {
    storeProduct,
    listProducts
}

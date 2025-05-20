const express = require('express')
const app = express() ;

app.use(express.json) ;
app.use(express.urlencoded({extended : true })) ;


const FILE_PATH = path.join(__dirname, "products.json"); //from here ill import data from json file in which i have my products
 
let products = [];
let useId = 1;

// RestApi 

// Creat API
app.post
const express = require('express')
const fs = require("fs");
const path = require("path");
const app = express() ;

app.use(express.json) ;
app.use(express.urlencoded({extended : true })) ;


const DATA_FILE = path.join(__dirname, "products.json"); //from here ill import data from json file in which i have my products
 
let products = [];
let useId = 1;

// RestApi 

// Creat API for creating a product
app.post("/create")
const express = require('express')
const fs = require("fs");
const path = require("path");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const DATA_FILE = path.join(__dirname, "products.json"); //from here ill import data from fake json file in which i have my products 

// helper to read products from file
function readProducts() {
  try {
    const data = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

// helper to write products to file
function writeProducts(products) {

  fs.writeFileSync(DATA_FILE, JSON.stringify(products, null, 2));
}

let products = [];
let useId = 1;

// RestApi 

// Create API for creating a product

app.post("/products", (req, res) => {
    const products = readProducts();
    const { name, price } = req.body;

    const newProduct = {
        id: Date.now().toString(), 
        name,
        price,
    };

    products.push(newProduct);
    writeProducts(products);

    res.status(201).json(newProduct);
})

//Fetching PRoducts
app.get("/products", (req, res) => {

  const products = readProducts();
  res.json(products);

});

//Getting Product
app.get("/products/:id", (req, res) => {
  const id = req.params.id;
  const products = readProducts();
  const product = products.find((p) => p.id == id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json(product);

});


//Updating Product

app.put("/products/:id", (req, res) => {
  const id = req.params.id;
  const { name, price } = req.body;

  const products = readProducts();
  const index = products.findIndex((p) => p.id == id);

  if (index === -1) {
    return res.status(404).json({ message: "Product not found" });
  }

  if (name !== undefined) products[index].name = name;
  if (price !== undefined) products[index].price = price;

  writeProducts(products);

  res.json(products[index]);

});

// Deleting Product
app.delete("/products/:id", (req, res) => {
  const id = req.params.id;
  const products = readProducts();
  const index = products.findIndex((p) => p.id == id);

  if (index === -1) {
    return res.status(404).json({ message: "Product not found" });
  }

  const deletedProduct = products.splice(index, 1)[0];
  writeProducts(products);

  res.json(deletedProduct);
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});

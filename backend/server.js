const express = require('express');
require('dotenv').config()
const data = require('./data');
const path = require('path')


const port = process.env.PORT || 5000;

const app = express();

app.use(express.json())

app.get('/api/products/:id', (req, res) => {
    const productId = req.param.id;
    const product = data.products.find(x=>x.id === productId);
    if (product) {
        res.send(product);
    }
    else {
        res.status(404).send({msg:"PRoduct Not Found!"});
    }
});

app.get('/api/products', (req, res) => {
    res.send(data.products);
});
    

app.use(express.static(path.join(__dirname, '../frontend/build')))
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../frontend/build/index.html')))


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
const express = require('express');
const data = require('./data');
const path = require('path')


const port = process.env.PORT || 5000;

const app = express();


app.get('/api/products', (req, res) => {
    res.send(data.products);
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
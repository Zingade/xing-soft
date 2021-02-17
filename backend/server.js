const express = require('express');
const data = require('./data');
const path = require('path')


const port = process.env.PORT || 5000;

const app = express();

app.use(express.static(path.join(__dirname, '../frontend/build')))
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../frontend/build/index.html')))

app.get('/api/products', (req, res) => {
    res.send(data.products);
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
const express = require('express');
require('dotenv').config()
const data = require('./data');
const path = require('path')
const mongoose = require('mongoose');
const userRoute = require('./routes/userRoute');
const bodyParser = require('body-parser');


const port = process.env.PORT || 5000;
const mongodbUrl = process.env.MONGODB_URL || 'mongodb://localhost/xing-shop';
mongoose.connect(mongodbUrl,{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
.catch(error => console.log(error.reason));

const app = express();

app.use(bodyParser.json())
app.use('/api/users', userRoute);
app.get('/api/products/:id', (req, res) => {
    const productId = req.params.id;

    const product = data.products.find(x=>x._id === productId);
    if (product) {
        res.send(product);
    }
    else {
        res.status(404).send({msg:"Product Not Found!"});
    }
});

app.get('/api/products', (req, res) => {
    res.send(data.products);
});
    

app.use(express.static(path.join(__dirname, '../frontend/build')))
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../frontend/build/index.html')))


app.listen(port, () => {
    console.log(`xingShop Backend is listening at http://localhost:${port}`)
  })
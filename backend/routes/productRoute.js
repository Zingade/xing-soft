const express = require('express');
const Product = require('../models/productModel')
const {getToken} = require('../util');

const router = express.Router();

router.get("/", async (req,res) => {
    const products = await Product.find({});
    res.send(products);
});

router.get('/:id', async (req, res) => {
    const productId = req.params.id;

    const product = await Product.findOne({_id:productId});
    if (product) {
        res.send(product);
    }
    else {
        res.status(404).send({msg:"Product Not Found!"});
    }
});

router.post("/", async (req, res)=>{
    const product = new Product({
        name: req.body.name,
        image:req.body.image,
        price:req.body.price,
        category:req.body.category,
        qty_measured_in: req.body.qty_measured_in,
        description: req.body.description,
    })
    const newProduct = await product.save(); 
    if(newProduct){
        return res.status(201).send({message: 'New Product Created', data: newProduct});
    }
    return res.status(500).send({message:'Error creating product in database!'});
})

module.exports = router;
const express = require('express');
require('dotenv').config()
const Product = require('../models/productModel')
const {getToken, isAuth, isAdmin} = require('../util');

const router = express.Router();

const twilloAccountSid = process.env.TwilloAccountSid;
const twilloAuthToken = process.env.TwilloAuthToken;

const client = require('twilio')(twilloAccountSid, twilloAuthToken); 

router.get('/', async (req, res) => {
    const category = req.query.category ? { category: req.query.category } : {};
    const searchKeyword = req.query.searchKeyword
      ? {
          name: {
            $regex: req.query.searchKeyword,
            $options: 'i',
          },
        }
      : {};
    const sortOrder = req.query.sortOrder
      ? req.query.sortOrder === 'lowest'
        ? { price: 1 }
        : { price: -1 }
      : { _id: -1 };
    const products = await Product.find({ ...category, ...searchKeyword }).sort(
      sortOrder
    );
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

function replaceAll(string, search, replace) {
   return string.split(search).join(replace);
}

router.post('/sendwhatsapp/:id', (req, res) => {
    var originalString = req.params.id;
    const newString = replaceAll(originalString,"$$","\n");  
    console.log(newString);
/*    client.messages 
    .create({ 
       body: newString, 
       from: 'whatsapp:+14155238886',       
       to: 'whatsapp:+919845210251' 
     }) 
    .then(message => console.log(message.sid)) 
    .done();*/
});


router.post("/", isAuth, isAdmin, async (req, res)=>{
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
        return res.status(200).send({message: 'New Product Created', data: newProduct});
    }
    return res.status(500).send({message:'Error creating product in database!'});
})

router.put("/:id", isAuth, isAdmin, async (req, res)=>{
    const productId = req.params.id;
    const product = await Product.findOne({_id:productId});
    if(product){
        product.name = req.body.name;
        product.image = req.body.image;
        product.price = req.body.price;
        product.category = req.body.category;
        product.qty_measured_in = req.body.qty_measured_in;
        product.description = req.body.description;
        const updatedProduct = await product.save();
        if(updatedProduct){
            return res.status(201).send({message:'Product updated!', data:updatedProduct})
        }
        return res.status(500).send({message:'Error in updating product!'})
    }
})

router.delete("/:id", isAuth, isAdmin, async (req, res)=>{
    const productId = req.params.id;
    const product = await Product.findOne({_id:productId});
    if(product){
        product.remove();
        res.send({message:"Product Deleted!"});
    }
    else{
        res.send({message:"Error in Product Deletion!"});
    }
})


module.exports = router;
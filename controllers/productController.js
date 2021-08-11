const Product = require('../models/Product')
const { validationResult } = require('express-validator')


exports.createProduct = async (req, res) => {
    // error check
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    try {
        const product = new Product( req.body )
        await product.save()
        res.json({product})
    } catch (error) {
        console.log(error);
        res.status(500).send('Something went wrong.')
    }

}

exports.getProduct = async (req, res) => {
    try {

       const product = await Product.findById(req.params.id)
       if(!product){
           return res.status(404).json({ msg: 'Product not found' })
       }

       res.json({product})

    } catch (error) {
        console.log(error);
        res.status(500).send('Something went wrong.')
    }
}

exports.getProducts = async (req, res) => {

    try {
        const products = await Product.find()
        if(!products){
            return res.status(404).json({ msg: 'Products not found' })
        }
        res.json({products})

    } catch (error) {
        console.log(error);
        res.status(500).send('Something went wrong.')
    }
}

exports.updateProduct = async (req, res) => {
   // error check
   const errors = validationResult(req)
   if(!errors.isEmpty()){
       return res.status(400).json({errors: errors.array()})
   }
   const newProduct = req.body
   
   try {

    let product = await Product.findById(req.params.id)

    if(!product) {
        return res.status(404).json({ msg: 'Product not found' })
    }

    product = await Product.findByIdAndUpdate( { _id: req.params.id }, { $set: newProduct}, {new: true} )

    res.json({product})
       
   } catch (error) {
       console.log(error);
       res.status(500).send('Something went wrong.')
   }
}

exports.deleteProduct = async (req, res) => {
    try {
        let product = await Product.findById(req.params.id)

        if(!product) {
            return res.status(404).json({ msg: 'Product not found' })
        }

        await Product.findOneAndRemove({ _id: req.params.id })
        res.json({ msg: 'Success' })

    } catch (error) {
        console.log(error);
        res.status(500).send('Something went wrong.')
    }
}
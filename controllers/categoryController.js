const Category = require('../models/Category')
const { validationResult } = require('express-validator')


exports.createCategory = async (req, res) => {
    // Error check
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return req.status(400).json({ errors: errors.array() })
    }

    try {
        const category = new Category (req.body)
        await category.save()
        res.json({category})
    } catch (error) {
        console.log(error);
        res.status(500).send('Something went wrong')
    }
}

exports.getCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id)

        if(!category){
            return res.status(404).json({ msg: "Category not found" })
        }

        res.json({ category })
    } catch (error) {
        console.log(error);
        res.status(500).send("Something went wrong")
    }
}

exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find()
        if(!categories){
            return res.status(404).json({ msg: "Categories not found" })
        }

        res.json({categories})
    } catch (error) {
        console.log(error);
        res.status(500).send("Something went wrong")
    }
}

exports.updateCategory = async (req, res) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }

    const newCategory = req.body

    try {
        let category = await Category.findById(req.params.id)

        if(!category){
            return res.status(404).json({ msg: "Category not found "})
        }

        category = await Category.findByIdAndUpdate( {_id:req.params.id}, { $set: newCategory }, { new: true } )

        res.json({category})

    } catch (error) {
        console.log(error);
        res.status(500).send("Something went wrong")
    }


}

exports.deleteCategory = async (req, res) => {
    try {
        let category = await Category.findById(req.params.id)

        if(!category){
            return res.status(404).json({ msg: "Category not found" })
        }

        await Category.findByIdAndRemove({ _id: req.params.id })

        res.json({ msg: "Success"})
    } catch (error) {
        console.log(error);
        res.status(500).send("Something went wrong")
    }
}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
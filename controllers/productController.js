const Product = require("../models/product")
const { body, validationResult } = require("express-validator")
const asyncHandler = require("express-async-handler")

exports.listProducts = asyncHandler(async (req, res, next) => {
  const allProducts = await Product.find({})
    .sort({ name: 1 })
    .exec()
  res.json(allProducts)
})

exports.getProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id).exec()
  res.json(product)
})

exports.createProduct = [
  body("name", "Name must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("description", "Description must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("image_url", "Image URL must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("price", "Price must be a positive number")
    .isFloat({ min: 0 }),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req)
    const product = new Product({
      name: req.body.name,
      description: req.body.description,
      image_url: req.body.image_url,
      price: req.body.price,
    })

    if(!errors.isEmpty()) {
      res.json(errors.array())
    }

    await product.save()
    res.redirect("/catalog/product/" + product._id)
  })
]

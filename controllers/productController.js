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
    if(!errors.isEmpty()) {
      res.json(errors.array())
    } else {
      const product = new Product({
        name: req.body.name,
        description: req.body.description,
        image_url: req.body.image_url,
        price: req.body.price,
      })

      await product.save()
      res.redirect("/products/" + product._id)
    }
  })
]

exports.updateProduct = [
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
    if(!errors.isEmpty()) {
      res.json(errors.array())
    } else {
      const product = new Product({
        _id: req.params.id,
        name: req.body.name,
        description: req.body.description,
        image_url: req.body.image_url,
        price: req.body.price,
      })

      const updatedProduct = await Product.findByIdAndUpdate(req.params.id, product, {})
      res.redirect("products/" + updatedProduct._id)
    }
  })
]

exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const product = Product.findById(req.params.id).exec()
  if(product === null) {
    res.redirect("/products")
  } else {
    await Product.findByIdAndRemove(req.body.id)
    res.redirect("/products")
  }
})

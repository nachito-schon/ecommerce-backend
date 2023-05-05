const Product = require("../models/product")
const Brand = require("../models/brand")
const { body, validationResult } = require("express-validator")
const asyncHandler = require("express-async-handler")

exports.listProducts = asyncHandler(async (req, res, next) => {
  const allProducts = await Product.find({})
    .sort({ name: 1 })
    .populate("brand")
    .exec()
  res.json(allProducts)
})

exports.getProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id)
    .populate("brand")
    .exec()
  res.json(product)
})

exports.createProduct = [
  body("brand.name", "Brand name must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
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
    .isLength({ min: 1 }),
  body("price", "Price must be a positive number")
    .isFloat({ min: 0 }),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
      res.json(errors.array())
    } else {
      let brand = await Brand.findOne({ "name": req.body.brand.name }).exec()
      if(brand === null) {
        if(!req.body.brand.logo_url) {
          res.status(500).json({ message: "Must set a logo URL" })
        }

        const newBrand = new Brand({
          name: req.body.brand.name,
          logo_url: req.body.brand.logo_url
        })

        brand = await newBrand.save()
      }

      const product = new Product({
        brand: brand._id,
        name: req.body.name,
        description: req.body.description,
        image_url: req.body.image_url,
        price: req.body.price,
      })

      const createdProduct = await product.save()
      res.redirect("/products/" + createdProduct._id)
    }
  })
]

exports.updateProduct = [
  body("brand.name", "Brand name must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
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
    .isLength({ min: 1 }),
  body("price", "Price must be a positive number")
    .isFloat({ min: 0 }),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
      res.json(errors.array())
    } else {
      let brand = await Brand.findOne({ "name": req.body.brand.name }).exec()
      if(brand === null) {
        if(!req.body.brand.logo_url) {
          res.status(500).json({ message: "Must set a logo URL" })
        }

        const newBrand = new Brand({
          name: req.body.brand.name,
          logo_url: req.body.brand.logo_url
        })

        brand = await newBrand.save()
      }

      const product = new Product({
        _id: req.params.id,
        brand: brand._id,
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

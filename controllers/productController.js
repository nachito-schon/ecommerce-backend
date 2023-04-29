const Product = require("../models/product")
const asyncHandler = require("express-async-handler")

exports.productList = asyncHandler(async (req, res, next) => {
  const allProducts = await Product.find({})
    .sort({ name: 1 })
    .exec()

  res.json(allProducts)
})

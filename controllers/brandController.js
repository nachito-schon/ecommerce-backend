const Brand = require("../models/brand")
const asyncHandler = require("express-async-handler")


exports.listBrands = asyncHandler(async (req, res, next) => {
  const allBrands = await Brand.find({})
    .sort({ name: 1 })
    .exec()
  res.json(allBrands)
})
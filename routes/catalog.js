const express = require("express")
const router = express.Router()
const productController = require("../controllers/productController")

router.get("/", productController.listProducts)

router.post("/product/create", productController.createProduct)

router.get("/product/:id", productController.getProduct)

module.exports = router

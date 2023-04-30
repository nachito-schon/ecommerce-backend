const express = require("express")
const router = express.Router()
const productController = require("../controllers/productController")

router.get("/", productController.listProducts)

router.post("/create", productController.createProduct)

router.post("/:id/delete", productController.deleteProduct)

router.post("/:id/update", productController.updateProduct)

router.get("/:id", productController.getProduct)

module.exports = router

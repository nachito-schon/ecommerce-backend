const express = require("express")
const router = express.Router()
const passport = require("passport")
const jwtStrategy = require("../strategies/jwt")
const productController = require("../controllers/productController")

passport.use(jwtStrategy)

router.get("/", productController.listProducts)

router.post("/create", passport.authenticate('jwt', { session: false }), productController.createProduct)

router.post("/:id/delete", passport.authenticate('jwt', { session: false }), productController.deleteProduct)

router.post("/:id/update", passport.authenticate('jwt', { session: false }), productController.updateProduct)

router.get("/:id", productController.getProduct)

module.exports = router

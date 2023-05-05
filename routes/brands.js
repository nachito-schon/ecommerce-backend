const express = require("express")
const router = express.Router()
const brandController = require("../controllers/brandController")

router.get("/", brandController.listBrands)

module.exports = router
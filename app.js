'use strict'

require("dotenv").config()
const express = require("express")
const indexRouter = require("./routes/index")
const catalogRouter = require("./routes/products")
const brandsRouter = require("./routes/brands")
const userRouter = require("./routes/user")
const mongoose = require("mongoose")
const compression = require("compression")
const helmet = require("helmet")

const app = express()

const RateLimit = require("express-rate-limit")
const limiter = RateLimit({
  windowMs: 1 * 60 * 1000,
  max: 20,
})

app.use(limiter)

mongoose.set("strictQuery", false)
const mongoDB = process.env.DB_URL || "mongodb+srv://admin:admin@cluster0.pmppucv.mongodb.net/?retryWrites=true&w=majority"
const main = async () => {
  await mongoose.connect(mongoDB, {dbName: 'ecommerce-v2'})
}

main().catch((error) => console.log(error))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(compression())
app.use(helmet())
app.use("/", indexRouter)
app.use("/products", catalogRouter)
app.use("/brands", brandsRouter)
app.use("/user", userRouter)

module.exports = app

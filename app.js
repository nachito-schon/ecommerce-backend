require("dotenv").config()
const express = require("express")
const app = express()
const indexRouter = require("./routes/index")
const catalogRouter = require("./routes/catalog")
const port = process.env.PORT || 3000
const mongoose = require("mongoose")

mongoose.set("strictQuery", false)

const mongoDB = process.env.DB_URL || 'mongodb+srv://admin:admin@cluster0.pmppucv.mongodb.net/?retryWrites=true&w=majority'
const main = async () => {
  await mongoose.connect(mongoDB, {dbName: 'ecommerce'})
}

main().catch((error) => console.log(error))

app.use("/", indexRouter)
app.use("/catalog", catalogRouter)

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})

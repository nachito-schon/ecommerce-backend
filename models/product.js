const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ProductSchema = new Schema({
  brand: { type: Schema.Types.ObjectId, ref: "Brand", required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  image_url: { type: String, required: true },
  price: { type: Number, required: true }
})

module.exports = mongoose.model("Product", ProductSchema)

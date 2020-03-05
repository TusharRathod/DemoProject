const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  id: { type: String },
  imgUrl: { type: String },
  name: { type: String },
  price: { type: Number },
  rating: { type: Number },
  review: { type: Number },
  favorite: { type: Boolean },
  actualPrice: { type: Number },
  discountPercent: { type: Number }
});

module.exports = mongoose.model("products", ProductSchema);

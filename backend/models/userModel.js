const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let UserSchema = new Schema({
  createdAt: { type: Date },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  mobileNo: { type: String, required: true },
  password: { type: String, required: true },
  isLogin: { type: Boolean },
  img: { type: String },
  coverImage:{type:String},
  wishlist: [{ type: Schema.Types.ObjectId, ref: "products" }]
});

module.exports = mongoose.model("users", UserSchema);

const express = require("express");
const router = express.Router();

const product_controller = require("../controllers/productController");

router.get("/all", product_controller.listAll);
router.post("/addToWishlist", product_controller.add_to_wishlist);
router.post("/removeToWishlist", product_controller.remove_to_wishlist);
router.get("/detail/:id", product_controller.productDetail);
router.get("/wishlist", product_controller.wishlist);

module.exports = router;

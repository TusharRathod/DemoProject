const productModel = require("../models/productModel");
const userModel = require("../models/userModel");
// const jwt = require("jsonwebtoken");
// const express = require("express");

module.exports = {
  listAll: function(req, res, next) {
    productModel
      .find({})
      // .where("price")
      // .gte(req.body.min)
      // .lte(req.body.max)
      .exec((err, products) => {
        if (err) throw console.log(err);
        userModel.findOne({ _id: req.userId }, (err, user) => {
          if (err) console.log(err);
          res.json({ success: true, data: products, wishlist: user.wishlist });
        });
      });
  },

  add_to_wishlist: function(req, res, next) {
    userModel.updateOne(
      { _id: req.userId },
      { $push: { wishlist: req.body.productId } },
      (err, result) => {
        if (err) console.log(err);
        userModel.findOne({ _id: req.userId }, (err, user) => {
          if (err) console.log(err);
          res.json({ success: true, data: result, wishlist: user.wishlist });
        });
      }
    );
  },
  remove_to_wishlist: function(req, res, next) {
    userModel.updateOne(
      { _id: req.userId },
      { $pull: { wishlist: req.body.productId } },
      (err, result) => {
        if (err) console.log(err);
        userModel.findOne({ _id: req.userId }, (err, user) => {
          if (err) console.log(err);
          res.json({ success: true, data: result, wishlist: user.wishlist });
        });
      }
    );

    // productModel.findByIdAndUpdate(
    //   req.body.id,
    //   { favorite: false },
    //   (err, result) => {
    //     if (err) console.log(err);
    //     productModel.find((err, list) => {
    //       if (err) throw err;
    //       res.json({ success: true, data: list, message: "removed!!" });
    //     });
    //   }
    // );
  },
  productDetail: function(req, res, next) {
    productModel.findById(req.params.id, (err, result) => {
      if (err) console.log(err);
      res.json({ success: true, message: "good!!!", data: result });
    });
  },

  wishlist: (req, res, next) => {
    userModel
      .findById(req.userId)
      .populate("wishlist")
      .exec((err, result) => {
        if (err) console.log(err);
        res.json({ wishlist: result.wishlist, success: true });
      });
  }
};

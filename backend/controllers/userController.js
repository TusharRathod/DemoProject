const user_model = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;

module.exports = {
  register: function(req, res, next) {
    let date = new Date();
    let password = bcrypt.hashSync(req.body.password, saltRounds);
    user_model.findOne({ email: req.body.email }, (err, result) => {
      if (err) throw err;
      if (!result) {
        user_model.create(
          {
            createdAt: date.getTime(),
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            mobileNo: req.body.mobileNo,
            password: password,
            isLogin: false,
            wishlist: [],
            img: "",
            coverImage: ""
          },
          (err, result) => {
            if (err) throw next(err);
            res.json({ success: true, message: "User Registered", result });
          }
        );
      } else {
        res.json({
          success: false,
          message: "Username already taken.Please use another username"
        });
      }
    });
  },
  authentication: function(req, res, next) {
    user_model.findOne({ email: req.body.email }, (err, result) => {
      console.log(err, result);
      if (err) {
        next(err);
        console.log(err);
      } else {
        if (result) {
          if (bcrypt.compareSync(req.body.password, result.password)) {
            user_model.findByIdAndUpdate(
              result._id,
              { isLogin: true },
              (err, answer) => {
                if (err) next(err);
                const token = jwt.sign(
                  { userId: result._id },
                  req.app.get("secretKey")
                );
                res.json({
                  success: true,
                  message: "User found!",
                  data: {
                    user: {
                      _id: result._id,
                      firstName: result.firstName,
                      lastName: result.lastName,
                      email: result.email,
                      userId: result.userId,
                      img: result.img,
                      coverImage: result.coverImage
                    },
                    token
                  }
                });
              }
            );
          } else {
            res.json({
              success: false,
              message: "Invalid password!!!",
              data: null
            });
          }
        } else {
          res.json({
            success: false,
            message: "Invalid email",
            data: null
          });
        }
      }
    });
  },
  logout: function(req, res, next) {
    user_model.findByIdAndUpdate(
      req.body.id,
      { isLogin: false },
      (err, result) => {
        if (err) next(err);
        res.json({ success: true, message: "User logout success" });
      }
    );
  },
  uploadImage: (req, res, next) => {
    user_model.updateOne(
      { _id: req.userId },
      { img: "/uploads/" + req.file.filename },
      (err, result) => {
        if (err) console.log(err);
        if (result.nModified) {
          user_model.findById(req.userId, (err, user) => {
            if (err) console.log(err);
            res.json({
              success: true,
              data: {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                img: user.img,
                coverImage: user.coverImage
              },
              message: "image upload success"
            });
          });
        } else {
          res.json({ success: false, message: "image uploaded false" });
        }
      }
    );
  },
  coverImgUpload: (req, res, next) => {
    user_model.updateOne(
      { _id: req.userId },
      { coverImage: "/uploads/" + req.file.filename },
      (err, result) => {
        if (err) console.log(err);

        if (result.nModified) {
          user_model.findById(req.userId, (err, user) => {
            if (err) console.log(err);
            res.json({
              success: true,
              data: {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                img: user.img,
                coverImage: user.coverImage
              },
              message: "image upload success"
            });
          });
        } else {
          res.json({ success: false, message: "image uploaded false" });
        }
      }
    );
  },
  userDetail: (req, res, next) => {
    user_model.findById(req.userId, (err, user) => {
      if (err) console.log(err);
      if (user) {
        res.json({
          success: true,
          data: {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            img: user.img,
            coverImage: user.coverImage
          },
          message: "user found"
        });
      } else {
        res.json({ success: false, data: null, message: "user not found" });
      }
    });
  }
};

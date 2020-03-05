const express = require("express");
const router = express.Router();
const multer = require("multer");
let user_controller = require("../controllers/userController");

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("file not accepted only png and jpeg is accept"), false);
  }
};
var upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

router.post("/register", user_controller.register);
router.post("/login", user_controller.authentication);
router.post("/logout", user_controller.logout);
router.post("/image", upload.single("image"), user_controller.uploadImage);
router.post("/cover", upload.single("image"), user_controller.coverImgUpload);
router.get("/", user_controller.userDetail);

module.exports = router;

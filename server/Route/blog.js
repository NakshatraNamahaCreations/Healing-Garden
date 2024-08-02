const blogController = require("../Controller/Blog");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "Public/BlogImage");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/addblog", upload.single("blogimage"), blogController.AddBlog);
router.get("/getallblog", blogController.getAllBlog);
router.get("/getblog", blogController.getSearchedBlog);
router.put("/editblog/:id", upload.single("blogimage"), blogController.update);
router.post("/trash/:id", blogController.trash);
router.get("/getbyblogid/:id", blogController.getByid);
module.exports = router;

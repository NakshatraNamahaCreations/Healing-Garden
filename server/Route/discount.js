const discountController = require("../Controller/Discount");
const express = require("express");
const router = express.Router();

router.post("/addiscount", discountController.Addiscount);
router.get("/getalldiscount", discountController.getAlldiscount);
router.put("/editdiscount/:id", discountController.update);
router.post("/trash/:id", discountController.trash);
router.get("/getbyiddiscount/:id", discountController.getByid);
router.get("/getbyuser", discountController.GetDataWithClients);
module.exports = router;

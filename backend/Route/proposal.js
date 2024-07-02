const ProposalController = require("../Controller/proposal");
const express = require("express");
const router = express.Router();

router.post("/addproposal", ProposalController.AddProposal);
router.get("/getallproposal", ProposalController.getAllOrder);

module.exports = router;

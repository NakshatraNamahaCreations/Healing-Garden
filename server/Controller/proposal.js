const RequestProposalModal = require("../Modal/Proposal");

exports.AddProposal = async (req, res) => {
  let { companyname, mobileno, email, workshop, max, message,Username } = req.body;

  try {
    const OrderData = new RequestProposalModal({
      companyname,
      mobileno,
      email,
      workshop,
      max,
      message,Username
    });

    const savedOrder = await OrderData.save();

    if (savedOrder) {
      return res.status(200).json({ message: "Request sent", savedOrder });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal error" });
  }
};

exports.getAllOrder = async (req, res) => {
  try {
    const OrderData = await RequestProposalModal.find({});
    return res.status(200).json({ data: OrderData });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal error" });
  }
};

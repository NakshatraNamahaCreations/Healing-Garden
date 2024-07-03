const userModal = require("../Modal/user");

exports.Addusers = async (req, res) => {
  let { usertype, email, password, phone } = req.body;
  try {
    let findData = await userModal.find({});
    if (findData.usertype === "corporate user") {
      // findData.email
    }
    if (findData.usertype === "individual user") {
      // email with password or phone number with otp
    }
    const AddData = new userModal({
      usertype,
      email,
      password,
      phone,
    });
    let SaveData = await AddData.save();
    if (SaveData) {
      return res
        .status(200)
        .json({ message: "Succesfully user Added", data: SaveData });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Error" });
  }
};
exports.getAlluser = async (req, res) => {
  try {
    const userData = await userModal.find({});
    return res.status(200).json({ data: userData });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal error" });
  }
};
exports.Loginuser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModal.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Invalid Email or Password!" });
    }

    if (user.password !== password) {
      return res.status(401).json({ error: "Invalid Email or Password!" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal error" });
  }
};
exports.getSearcheduser = async (req, res) => {
  try {
    const { searchValue } = req.query;
    const categoryData = await userModal.find({
      username: { $regex: new RegExp(escapeRegex(searchValue), "i") },
    });
    let Ddata = await userModal.find({});

    return res.status(200).json({ data: searchValue ? categoryData : Ddata });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal error" });
  }
};
function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}
exports.getByid = async (req, res) => {
  let id = req.params.id;
  try {
    const userData = await userModal.findOne({ _id: id });

    if (userData) {
      return res.status(200).json({ data: userData });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal error" });
  }
};

exports.update = async (req, res) => {
  let { username, email, contact, altcontact, city, state, address } = req.body;
  try {
    let idd = req.params.id;

    const findData = await userModal.findOne({
      _id: idd,
    });
    if (!findData) {
      return res.json({ error: "No such record found" });
    }
    findData.username = username || findData.username;

    findData.email = email || findData.email;

    findData.contact = contact || findData.contact;
    findData.altcontact = altcontact || findData.altcontact;
    findData.city = city || findData.city;
    findData.state = state || findData.state;
    findData.address = address || findData.address;
    const updateuser = await userModal.findOneAndUpdate(
      { _id: idd },
      findData,
      { new: true }
    );
    return res.status(200).json({
      message: "Updated successfully",
      date: updateuser,
    });
  } catch (error) {
    return res.status(500).json({ error: "Unable to update the user" });
  }
};

exports.trash = async (req, res) => {
  let id = req.params.id;
  try {
    const userData = await userModal.findOneAndDelete({
      _id: id,
    });

    if (userData) {
      return res.status(200).json({ data: userData });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal error" });
  }
};

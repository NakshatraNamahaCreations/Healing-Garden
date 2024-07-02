const ProductModal = require("../Modal/product/Product");

exports.GetDataWithClients = async (req, res) => {
  try {
    const { searchValue } = req.query;
    const query = searchValue
      ? { Workshopname: { $regex: new RegExp(escapeRegex(searchValue), "i") } }
      : {};

    const data = await ProductModal.aggregate([
      {
        $lookup: {
          from: "clients",
          localField: "clientId",
          foreignField: "_id",
          as: "ClientData",
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "CategoryId",
          foreignField: "_id",
          as: "CategoryData",
        },
      },
      { $match: query },
    ]);

    if (data.length > 0) {
      res.status(200).json({ productData: data });
    } else {
      res.status(404).json({ error: "No Data Found!" });
    }
  } catch (error) {
    console.log("Error fetching data with clients:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}



exports.AddProduct = async (req, res) => {
  let {
    workshopTitle,
    category,
    mode,
    city,
    subLocation,
    sessionAddress,
    WFeePerParticipant,
    gMapDirection,
    discription,
    WorkshopSlots,
    language,
    minAge,
    discount,
    YouTubeLink,
    Live,
    Pause,
    OfferPrice, terms
  } = req.body;

  const files = req.files;
  const fileNames = files.map(file => file.filename);

  try {
    const ProductData = new ProductModal({
      workshopTitle,
      category,
      mode,
      city,
      subLocation,
      sessionAddress,
      WFeePerParticipant,
      gMapDirection,
      discription,
      WorkshopSlots,
      language,
      minAge,
      discount,
      YouTubeLink,
      Live,
      Pause,
      OfferPrice, terms,
      WorkshopImages: fileNames
    });

    const savedProduct = await ProductData.save();

    if (savedProduct) {
      return res
        .status(200)
        .json({ message: 'Workshop Added Successfully', savedProduct });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal error' });
  }
};




exports.getAllProduct = async (req, res) => {
  try {
    const ProductData = await ProductModal.find({});
    return res.status(200).json({ data: ProductData });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal error" });
  }
};

exports.getSearchedProduct = async (req, res) => {
  try {
    const { searchValue } = req.query;

    const query = searchValue
      ? { Workshopname: { $regex: new RegExp(escapeRegex(searchValue), "i") } }
      : {};

    const CategoryIdData = await ProductModal.find(query);

    return res.status(200).json({ data: CategoryIdData || [] });
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
    const ProductData = await ProductModal.findOne({ _id: id });

    if (ProductData) {
      return res.status(200).json({ data: ProductData });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal error" });
  }
};

exports.getByUserid = async (req, res) => {
  try {
    const clientId = req.params.id;
    const products = await ProductModal.find({ clientId });

    return res.status(200).json({ data: products });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal error" });
  }
};

exports.update = async (req, res) => {
  let {
    workshopTitle,
    category, terms,
    mode,
    city,
    subLocation,
    sessionAddress,
    WFeePerParticipant,
    gMapDirection,
    discription,
    WorkshopSlots,
    language,
    minAge,
    discount,
    YouTubeLink,
    Live,
    Pause,
    OfferPrice
  } = req.body;
  const files = req.files;
  const fileNames = files.map(file => file.filename);

  try {

    let idd = req.params.id;
    const findProduct = await ProductModal.findOne({ _id: idd });
    if (!findProduct) {
      return res.json({ error: "No such record found" });
    }

    findProduct.terms = terms || findProduct.terms;
    findProduct.workshopTitle = workshopTitle || findProduct.workshopTitle;
    findProduct.category = category || findProduct.category;
    findProduct.city = city || findProduct.city;
    findProduct.subLocation = subLocation || findProduct.subLocation;
    findProduct.sessionAddress = sessionAddress || findProduct.sessionAddress;
    findProduct.WFeePerParticipant = WFeePerParticipant || findProduct.WFeePerParticipant;
    findProduct.language = language || findProduct.language;
    findProduct.gMapDirection = gMapDirection || findProduct.gMapDirection;
    findProduct.discription = discription || findProduct.discription;
    findProduct.minAge = minAge || findProduct.minAge;
    findProduct.discount = discount || findProduct.discount;
    findProduct.Live = Live !== undefined ? Live : findProduct.Live;
    findProduct.Pause = Pause !== undefined ? Pause : findProduct.Pause;
    findProduct.OfferPrice = OfferPrice || findProduct.OfferPrice;
    findProduct.WorkshopImages = fileNames.length > 0 ? fileNames : findProduct.WorkshopImages;

    if (mode) {
      try {
        const parsedMode = JSON.parse(mode);
        findProduct.mode = {
          online: parsedMode.online !== undefined ? parsedMode.online : findProduct.mode.online,
          offline: parsedMode.offline !== undefined ? parsedMode.offline : findProduct.mode.offline,
        };


        findProduct.mode = JSON.stringify(findProduct.mode);

      } catch (error) {
        return res.status(400).json({ error: "Invalid mode format" });
      }
    }



    if (YouTubeLink) {
      findProduct.YouTubeLink = YouTubeLink;
    }

    if (WorkshopSlots) {
      try {
        const parsedSlots = JSON.parse(WorkshopSlots);
        findProduct.WorkshopSlots = {
          sessionType: parsedSlots.sessionType || findProduct.WorkshopSlots.sessionType,
          slots: parsedSlots.slots.length ? parsedSlots.slots.map(slot => ({
            startTime: slot.startTime,
            endTime: slot.endTime,
            Workshodate: slot.Workshodate,
            duration: slot.duration
          })) : findProduct.WorkshopSlots.slots,
        };
        findProduct.WorkshopSlots = JSON.stringify(findProduct.WorkshopSlots);
      } catch (error) {
        return res.status(400).json({ error: "Invalid WorkshopSlots format" });
      }
    }






    const updateProduct = await ProductModal.findOneAndUpdate(
      { _id: idd },
      findProduct,
      { new: true }
    );

    return res.status(200).json({
      message: "Updated successfully",
      data: updateProduct,
    });
  } catch (error) {
    return res.status(500).json({ error: "Unable to update the Product" });
  }
};



exports.trash = async (req, res) => {
  let id = req.params.id;
  try {
    const ProductData = await ProductModal.findOneAndDelete({
      _id: id,
    });

    if (ProductData) {
      return res.status(200).json({ data: ProductData });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal error" });
  }
};

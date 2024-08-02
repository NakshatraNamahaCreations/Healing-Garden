const BlogModal = require("../Modal/category/Blog");

exports.AddBlog = async (req, res) => {
  let file = req.file.filename;
  let { title, subtitle, desc } = req.body;
  try {
    const BlogData = new BlogModal({ title, subtitle, desc, blogimage: file });

    const savedBlog = await BlogData.save();

    if (savedBlog) {
      return res
        .status(200)
        .json({ message: "Blog Added Successfully", savedBlog });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal error" });
  }
};

exports.getAllBlog = async (req, res) => {
  try {
    const BlogData = await BlogModal.find({});

    return res.status(200).json({ data: BlogData });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal error" });
  }
};

exports.getSearchedBlog = async (req, res) => {
  try {
    const { searchValue } = req.query;

    const query = searchValue
      ? {
          $or: [
            { title: { $regex: new RegExp(escapeRegex(searchValue), "i") } },
            { subtitle: { $regex: new RegExp(escapeRegex(searchValue), "i") } },
          ],
        }
      : {};

    const CategoryIdData = await BlogModal.find(query);

    return res.status(200).json({ data: CategoryIdData || [] });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal error" });
  }
};

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

exports.update = async (req, res) => {
  let { title, subtitle, desc } = req.body;
  try {
    let idd = req.params.id;
    const file = req.file?.filename;
    const findBlog = await BlogModal.findOne({
      _id: idd,
    });
    if (!findBlog) {
      return res.json({ error: "No such record found" });
    }
    findBlog.title = title || findBlog.title;
    findBlog.subtitle = subtitle || findBlog.subtitle;
    findBlog.desc = desc || findBlog.desc;

    if (file) {
      findBlog.blogimage = file;
    }

    const updateBlog = await BlogModal.findOneAndUpdate(
      { _id: idd },
      findBlog,
      { new: true }
    );
    return res.status(200).json({
      message: "Updated successfully",
      date: updateBlog,
    });
  } catch (error) {
    return res.status(500).json({ error: "Unable to update the Blog" });
  }
};

exports.trash = async (req, res) => {
  let id = req.params.id;
  try {
    const BlogData = await BlogModal.findOneAndDelete({ _id: id });

    if (BlogData) {
      return res.status(200).json({ data: BlogData });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal error" });
  }
};
exports.getByid = async (req, res) => {
  let id = req.params.id;
  try {
    const Blogdata = await BlogModal.findOne({ _id: id });

    if (Blogdata) {
      return res.status(200).json({ data: Blogdata });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal error" });
  }
};

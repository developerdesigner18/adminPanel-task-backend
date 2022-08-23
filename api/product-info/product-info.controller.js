import { ProductInfo } from "./product-info.model.js";

export const addProduct = async (req, res) => {
  try {
    const newUser = new ProductInfo({ ...req.body });

    await newUser.save();

    res.status(200).json({ massage: "Successfully Product added" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const ShowAllProduct = async (req, res) => {
  try {
    const allCategories = await ProductInfo.find();

    res
      .status(200)
      .json({ massage: "Successfully Product added", allCategories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateProduct = async function (req, res) {
  console.log("req.body", req.body, req.params.id);
  try {
    const { email } = req.body;
    console.log(email, "--------------------");
    const updatedProduct = await ProductInfo.findOneAndUpdate(
      { _id: req.params.id },
      { ...req.body },
      { new: true }
    );
    res.status(200).json({
      success: "Product updated successfully ! ",
      message: "Product updated successfully !",
    });
    console.log("outside if");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const deleteProduct = async function (req, res) {
  console.log("req.body", req.body, req.params.id);
  try {
    await ProductInfo.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json({
      success: "Successfully Product deleted! ",
      message: "Successfully Product deleted !",
    });
    console.log("outside if");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

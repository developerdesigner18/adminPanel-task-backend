import { CategoryInfo } from "./category-info.model.js";

export const addCategory = async (req, res) => {
  try {
    const newUser = new CategoryInfo({ ...req.body });

    await newUser.save();

    res.status(200).json({ massage: "Successfully Category added" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const ShowAllCategory = async (req, res) => {
  try {
    const allCategories = await CategoryInfo.find();

    res
      .status(200)
      .json({ massage: "Successfully Category added", allCategories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const ShowFindOneCategory = async (req, res) => {
  try {
    console.log("res.body.id ===> ",req.params)
    // const {id} = req.body
    const findCategories = await CategoryInfo.findById(req.params.id);

    res
      .status(200)
      .json({ massage: "Successfully Category added", findCategories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateCategory = async function (req, res) {
  console.log("req.body", req.body, req.params.id);
  try {
    const { ename } = req.body;
    // console.log(email, "--------------------");
    const updatedCategory = await CategoryInfo.findOneAndUpdate(
      { _id: req.params.id },
      { name : ename },
      { new: true }
    );
    if(updatedCategory){
      res.status(200).json({
        success: "Category updated successfully ! ",
        message: "Category updated successfully !",
      });
    }else{
      res.status(504).json({
        error: "Category not updated ! ",
      });
    }
    
    console.log("outside if");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const deleteCategory = async function (req, res) {
  console.log("req.body", req.body, req.params.id);
  try {
    await CategoryInfo.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json({
      success: "Successfully category deleted! ",
      message: "Successfully category deleted !",
    });
    console.log("outside if");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

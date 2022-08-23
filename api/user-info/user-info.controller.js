import { UserInfo } from "./user-info.model.js";

export const updateAdminPanelUser = async function (req, res) {
  console.log("req.body", req.body, req.params.id);
  try {
    const { email } = req.body;
    console.log(email, "--------------------");
    if (email != undefined && email != null) {
      const existingEmail = await UserInfo.findOne({
        email: email,
        _id: { $ne: req.params.id },
      });
      console.log("email", existingEmail);
      if (existingEmail) {
        return res.status(422).json({
          message: "This email is already used.",
          err: "This email is already used.",
        });
      }
      const user = await UserInfo.findById({
        _id: req.params.id,
      });
      console.log(user, "===> here");
      console.log(req.body, "===> req", user, "==> user");

      const updatedUser = await UserInfo.findOneAndUpdate(
        { _id: req.params.id },
        { ...req.body },
        { new: true }
      );
      res.status(200).json({
        success: "User details updates successfully ! ",
        message: "User details updates successfully !",
      });
    } else {
      const user = await UserInfo.findById({
        _id: req.params.id,
      });
      console.log(user, "===> here");
      console.log(req.body, "===> req", user, "==> user");

      const updatedUser = await UserInfo.findOneAndUpdate(
        { _id: req.params.id },
        { ...req.body },
        { new: true }
      );
      res.status(200).json({
        success: "User details updates successfully ! ",
        message: "User details updates successfully !",
      });
    }
    console.log("outside if");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

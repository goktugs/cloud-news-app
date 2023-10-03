import UserModel from "../../models/user.model";

const changeUserPreferences = async (req, res) => {
  const userId = req.params.userId;
  console.log(userId);
  const { selectedSources, selectedCategories, selectedAuthors } = req.body;
  const user = await UserModel.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "No User Found" });
  }

  user.selectedSources = [...user.selectedSources, ...selectedSources];
  user.selectedCategories = [...user.selectedCategories, ...selectedCategories];
  user.selectedAuthors = [...user.selectedAuthors, ...selectedAuthors];

  await user.save();

  return res.status(200).json({ message: "Preferences Selected Successfully" });
};

export default changeUserPreferences;

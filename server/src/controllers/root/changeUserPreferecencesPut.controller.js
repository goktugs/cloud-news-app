import UserModel from "../../models/user.model";

const changeUserPreferencesPut = async (req, res) => {
  const userId = req.user.id;
  const { selectedSources, selectedCategories, selectedAuthors } = req.body;
  const user = await UserModel.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "No User Found" });
  }

  user.selectedSources = selectedSources;
  user.selectedCategories = selectedCategories;
  user.selectedAuthors = selectedAuthors;

  await user.save();

  return res.status(200).json({ message: "Preferences Selected Successfully" });
};

export default changeUserPreferencesPut;

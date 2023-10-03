import UserModel from "../../models/user.model";

const getUserPreferences = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await UserModel.findOne({
      _id: userId,
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const selectedSources = user.selectedSources;
    const selectedCategories = user.selectedCategories;

    return res.status(200).json({
      selectedSources,
      selectedCategories,
    });
  } catch (error) {
    console.error("Error getting user preferences:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default getUserPreferences;

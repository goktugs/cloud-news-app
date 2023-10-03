import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatarUrl: String,
  selectedSources: [String],
  selectedCategories: [String],
  selectedAuthors: [String],
});

const UserModel = mongoose.model("User", userSchema);

export default UserModel;

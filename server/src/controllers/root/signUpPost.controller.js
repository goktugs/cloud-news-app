import UserModel from "../../models/user.model";
import bcrypt from "bcrypt";

const signupPostRoot = async (req, res) => {
  const { email, password, username, avatarUrl } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      status: 400,
      message: "Please fill out all fields correctly",
    });
  }
  const userAlreadyExists = await UserModel.findOne({ email });
  if (userAlreadyExists) {
    return res.status(400).json({
      status: 400,
      message: "User with this email already exists",
    });
  }

  const passwordHash = bcrypt.hashSync(password, 10);

  const newUser = new UserModel({
    username,
    email,
    password: passwordHash,
    avatarUrl,
  });

  const user = await newUser.save();

  if (user) {
    res.status(201).json({
      status: 201,
      message: "User created successfully",
    });
  } else {
    res.status(500).json({
      status: 500,
      message: "Something went wrong, please try again later",
    });
  }
};

export default signupPostRoot;

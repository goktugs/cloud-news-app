import UserModel from "../../models/user.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const loginPostRoot = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      status: 400,
      message: "Please fill out all fields correctly",
    });
  }

  const user = await UserModel.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "15d",
      }
    );
    const refreshToken = jwt.sign(
      {
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "15d",
      }
    );

    res.status(200).json({
      accessToken,
      refreshToken,
      id: user.id,
    });
  } else {
    res.status(400).json({
      status: 400,
      message: "Invalid credentials",
    });
  }
};

export default loginPostRoot;

import jwt from "jsonwebtoken";

const refreshTokenPost = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({
      status: 400,
      message: "Please provide a refresh token",
    });
  }

  jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(400).json({
        status: 400,
        message: "Invalid refresh token",
      });
    }

    const accessToken = jwt.sign(
      {
        user: {
          id: decoded.user.id,
          username: decoded.user.username,
          email: decoded.user.email,
        },
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "3d",
      }
    );

    res.status(200).json({
      accessToken,
    });
  });
};

export default refreshTokenPost;

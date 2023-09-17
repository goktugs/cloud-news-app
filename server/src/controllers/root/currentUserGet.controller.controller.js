const currentUserGet = async (req, res) => {
  res.json({
    status: 200,
    message: "You are authorized",
    user: req.user,
  });
};

export default currentUserGet;

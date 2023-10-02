const getMe = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await req.db.User.findOne({
      _id: userId,
    });

    if (!user) {
      return res.status(404).json({
        message: "Kullanıcı bulunamadı",
      });
    }

    return res.status(200).json({
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Sunucu hatası",
      error: error.message,
    });
  }
};

export default getMe;

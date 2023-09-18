const NewsAPI = require("newsapi");

const newsapi = new NewsAPI(`${process.env.NEWSAPIORG_KEY}`);

const requestedNews = async (req, res) => {
  try {
    const { from, to, category, source, query } = req.body;
    const news = await newsapi.v2.everything({
      q: query || "news",
      sources: source,
      category,
      from,
      to,
    });
    res.json({
      status: 200,
      message: "News successfully retrieved",
      news,
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: 500,
      message: "Something went wrong. Please try again.",
    });
  }
};

export default requestedNews;

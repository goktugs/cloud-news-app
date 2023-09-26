const NewsAPI = require("newsapi");

const newsapi = new NewsAPI(`${process.env.NEWSAPIORG_KEY}`);

const allNewsGet = async (req, res) => {
  const { from, to, category, sources, q, page } = req.query;
  console.log(sources);
  try {
    const news = await newsapi.v2.everything({
      q: q?.length > 0 ? q : "news",
      sources,
      category,
      from,
      to,
      pageSize: 72,
      page,
    });
    res.json({
      status: 200,
      news,
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: 500,
      message: { error },
    });
  }
};

export default allNewsGet;

const NewsAPI = require("newsapi");

const newsapi = new NewsAPI(`${process.env.NEWSAPIORG_KEY}`);

const allNewsGet = async (req, res) => {
  const { from, to, category, source, q } = req.query;
  console.log(q);
  try {
    const news = await newsapi.v2.topHeadlines({
      q: q?.length > 0 ? q : "news",
      sources: source,
      category,
      from,
      to,
      pageSize: 72,
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

const NewsAPI = require("newsapi");

const newsapi = new NewsAPI(`${process.env.NEWSAPIORG_KEY}`);

const getAllHeadlines = async (req, res) => {
  const { category, sources, q, page } = req.query;
  try {
    const headlines = await newsapi.v2.topHeadlines({
      q: q?.length > 0 ? q : "",
      sources,
      category,
      pageSize: 24,
      page,
    });
    res.json({
      status: 200,
      headlines,
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: 500,
      message: { error },
    });
  }
};

export default getAllHeadlines;

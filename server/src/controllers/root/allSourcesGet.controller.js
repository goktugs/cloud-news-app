const NewsAPI = require("newsapi");

const newsapi = new NewsAPI(`${process.env.NEWSAPIORG_KEY}`);

const getAllSources = async (req, res) => {
  try {
    const sources = await newsapi.v2.sources({});
    res.json({
      status: 200,
      message: "Sources successfully retrieved",
      sources,
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: 500,
      message: "Something went wrong. Please try again.",
    });
  }
};

export default getAllSources;

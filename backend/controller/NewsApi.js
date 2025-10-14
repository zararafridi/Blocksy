const axios = require("axios");
const { NEWS_API_KEY } = require("../config/index");

// Controller function
const getNews = async (req, res) => {
  try {
    const response = await axios.get(
      `https://newsapi.org/v2/everything?q=business&sortBy=publishedAt&language=en&apiKey=${NEWS_API_KEY}`,
      {
         headers: { "User-Agent": "Mozilla/5.0" }, 
      }
    );
    res.json(response.data.articles.slice(0, 15)); // send top 15 articles
  } catch (error) {
    console.error("Error fetching news:", error.message);
    res.status(500).json({ message: `Error fetching news try again ${error.message}` },);
  }
};

module.exports = { getNews };
import { useState, useEffect } from "react";
import { getNews } from "../../api/internal";
import styles from "./Home.module.css";
import Loader from "../../components/loader/Loader";

function Home() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const data = await getNews();
      setArticles(data);
      setLoading(false);
    })();
  }, []); // ✅ only call once

  const handleCardClick = (url) => {
    window.open(url, "_blank");
  };

  if (loading) {
    return <Loader text="Loading news..." />;
  }

  return (
    <>
      <div className={styles.header}>Latest Articles</div>
      <div className={styles.grid}>
        {articles.map((article, i) => (
          <div
            className={styles.card}
            key={i}
            onClick={() => handleCardClick(article.url)}
          >
            <img src={article.urlToImage} alt="news" />
            <h3>{article.title}</h3>
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;

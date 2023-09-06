import { useState, useEffect } from "react";
import { getNews } from "../../api/external";
import styles from "./Home.module.css";
import Loader from "../../components/loader/Loader";

function Home() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    (async function newsApiCall() {
      const response = await getNews();
      setArticles(response);
    })();

    // clean up function
    setArticles([]);
  },[]);

  const handelCardClick = (url) => {
    window.open(url, "_blank");
  };

  // if (articles.length === 0) {
  //   return <Loader text="homepage" />;
  // }

  return (
    <>
      <div className={styles.header}>Latest Articels</div>
      <div className={styles.grid}>
        {articles.map((article) => (
          <div
            className={styles.card}
            key={article.url}
            onClick={() => handelCardClick(article.url)}
          >
            <img alt="" src={article.urlToImage} />
            <h3>{article.title}</h3>
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;

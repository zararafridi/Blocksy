import { useState, useEffect } from "react";
import Loader from "../../components/loader/Loader";
import styles from "./Blog.module.css";
import { getAllBlog } from "../../api/internal";
import { useNavigate } from "react-router-dom";

const Blog = () => {
  const navigate = useNavigate();
  const [blog, setBlog] = useState([]);

  useEffect(() => {
    (async function getAllBlogsApiCall() {
      const response = await getAllBlog();

      if (response.status === 200) {
        setBlog(response.data.blogs);
      }
    })();

    return () => setBlog([]); // cleanup
  }, []);

  if (blog.length === 0) {
    return <Loader text="Loading blogs..." />;
  }

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.heading}>Latest Blogs</h1>

      <div className={styles.grid}>
        {blog.map((b) => (
          <div
            key={b._id}
            className={styles.card}
            onClick={() => navigate(`/blog/${b._id}`)}
          >
            <div className={styles.imageWrapper}>
              <img alt={b.title} src={b.photo} />
            </div>
            <div className={styles.content}>
              <h2>{b.title}</h2>
              <p>{b.content.substring(0, 100)}...</p>
              <button className={styles.readMore}>Read More</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;

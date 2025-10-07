import { useState, useEffect } from "react";
import styles from "./BlogDetail.module.css";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getBlogById,
  deletBlog,
  postComment,
  getCommentById,
} from "../../api/internal";
import Loader from "../../components/loader/Loader";
import CommentList from "../../components/CommentList/CommentList";

const BlogDetail = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [blog, setBlog] = useState([]);
  const [comments, setComments] = useState([]);
  const [ownBlog, setOwnBlog] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [reload, setReload] = useState(false);

  const username = useSelector((state) => state.user.username);
  const userId = useSelector((state) => state.user._id);
  const blogId = params.id;

  useEffect(() => {
    async function getBlogDetails() {
      const commentResponse = await getCommentById(blogId);
      if (commentResponse.status === 200) {
        setComments(commentResponse.data.data);
      }
      const blogResponse = await getBlogById(blogId);
      if (blogResponse.status === 200) {
        //set owner ship
        setOwnBlog(username === blogResponse.data.blog.authorUsername)
        setBlog(blogResponse.data.blog);
      }
    }
    getBlogDetails();
  },[reload]);

 

  const postCommentHandler = async () => {
    const data = {
      author: userId,
      blog: blogId,
      content: newComment,
    };
    const response = await postComment(data);

    if (response.status === 201) {
      setNewComment("");
      setReload(!reload);
    }
  };
  const deletBlogHandlet = async () => {
    const response = await deletBlog(blogId);
    if (response.status === 200) {
      navigate("/");
    }
  };


  if(blog.length === 0){
    return <Loader text='blog Detail'/>
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <h1 className={styles.title}>{blog.title}</h1>
        <div className={styles.meta}>
          <p>
            @{blog.authorUsername + " on " + new Date(blog.createdAt).toDateString()}
          </p>
        </div>
        <div className={styles.photo}>
          <img src={blog.photo} width={250} height={250} alt="" />
        </div>
        <p className={styles.content}>{blog.content}</p>
        {ownBlog && (
          <div className={styles.controls}>
            <button className={styles.edit} onClick={() => {navigate(`/blog/update/${blog._id}`)}}>
              Edit
            </button>
            <button className={styles.delete} onClick={deletBlogHandlet}>
              Delete
            </button>
          </div>
        )}
      </div>
      <div className={styles.right}>
        <div className={styles.commentsWapper}>

          <h2 className={styles.commentsTitle}>Comments</h2>
          <CommentList comments={comments} />
          <div className={styles.postComment}>
            <input
              className={styles.input}
              placeholder="comment goes here..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button
              className={styles.postCommentBtn}
              onClick={postCommentHandler}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;

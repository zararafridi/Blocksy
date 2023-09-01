import {useState, useEffect} from 'react'
import Loader from '../../components/loader/Loader'
import styles from './Blog.module.css'
import { getAllBlog } from '../../api/internal'
import { useNavigate } from 'react-router-dom'


const Blog = () => {
    const navigate = useNavigate()
    const [blog, setBlog] = useState([]);
    
    useEffect(() => {
        (async function getAllBlogsApiCall(){
            const response = await getAllBlog();

            if(response.status === 200){
                setBlog(response.data.blogs)
            }
        })();

        // clean up 
        setBlog([]);
    },[])
    if(blog.length === 0){
        return <Loader text="blog's page"/>
    }

  return (
    <div className={styles.wrapper}>
        {blog.map((blog) => (
            <div key={blog._id} className={styles.blog} onClick={() => navigate(`/blog/${blog._id}`)}>
                <h1>{blog.title}</h1>
                <img alt='' src={blog.photo}/>
                <p>{blog.content}</p>
            </div>
        ))}
    </div>
  )
}

export default Blog
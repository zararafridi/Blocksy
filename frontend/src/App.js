import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import style from "./App.module.css";
import Protected from "./components/protected/Protected";
import Error from "./pages/Error/Error";
import Login from "./pages/Login/Login";
import { useSelector } from "react-redux";
import Signup from "./pages/signup/Signup";
import Crypto from "./pages/Crypto/Crypto";
import Blog from "./pages/Blogs/Blog";
import SubmitBlog from "./pages/SubmitBlog/SubmitBlog";
import BlogDetail from "./pages/BlogDetails/BlogDetail";
import UpdateBlog from "./pages/UpdateBlog/UpdateBlog";

function App() {
  const isAuth = useSelector((state) => state.user.auth);
  return (
    <div className={style.container}>
      <BrowserRouter>
        <div className={style.layout}>
          <Navbar />
          <Routes>
            <Route
              path="/"
              exact
              element={
                <div className={style.main}>
                  <Home />
                </div>
              }
            />
            <Route
              path="crypto"
              exact
              element={<div className={style.main}><Crypto/></div>}
            />
            <Route
              path="blogs"
              exact
              element={
                <Protected isAuth={isAuth}>
                  <div className={style.main}> <Blog/> </div>
                </Protected>
              }
            />
            <Route
              path="blog/:id"
              exact
              element={
                <Protected isAuth={isAuth}>
                  <div className={style.main}> <BlogDetail/> </div>
                </Protected>
              }
            />
            <Route
              path="/blog/update/:id"
              exact
              element={
                <Protected isAuth={isAuth}>
                  <div className={style.main}> <UpdateBlog/> </div>
                </Protected>
              }
            />
            <Route
              path="submit"
              exact
              element={
                <Protected isAuth={isAuth}>
                  <div className={style.main}><SubmitBlog/></div>
                </Protected>
              }
            />
            <Route
              path="login"
              exact
              element={<div className={style.main}><Login/></div>}
            />
            <Route
              path="signup"
              exact
              element={<div className={style.main}><Signup/></div>}
            />
            <Route path="*" element={<div className={style.main}><Error/></div>}/>
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

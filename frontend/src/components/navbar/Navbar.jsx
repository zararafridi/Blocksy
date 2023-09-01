import style from "./Navbar.module.css";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetUser } from "../../store/userSlice";
import { signout } from "../../api/internal";

const Navbar = () => {
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => state.user.auth);

  const handelSignout = async () => {
    await signout();
    dispatch(resetUser());
  };

  return (
    <>
      <nav className={style.navbar}>
        <NavLink className={`${style.logo} ${style.inActiveStyle}`} to="/">
          CoinBounce
        </NavLink>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? style.activeStyle : style.inActiveStyle
          }
        >
          Home
        </NavLink>
        <NavLink
          to="crypto"
          className={({ isActive }) =>
            isActive ? style.activeStyle : style.inActiveStyle
          }
        >
          Cryptocurrencies
        </NavLink>
        <NavLink
          to="blogs"
          className={({ isActive }) =>
            isActive ? style.activeStyle : style.inActiveStyle
          }
        >
          Blog
        </NavLink>
        <NavLink
          to="submit"
          className={({ isActive }) =>
            isActive ? style.activeStyle : style.inActiveStyle
          }
        >
          Submit a blog
        </NavLink>
        {isAuthenticated ? (
          <div>
            <NavLink
              className={({ isActive }) =>
                isActive ? style.activeStyle : style.inActiveStyle
              }
            >
              <button className={style.singUpbtn} onClick={handelSignout}>
                Sign-out
              </button>
            </NavLink>
          </div>
        ) : (
          <div>
            <NavLink
              to="login"
              className={({ isActive }) =>
                isActive ? style.activeStyle : style.inActiveStyle
              }
            >
              <button className={style.loginbtn}>Log-in</button>
            </NavLink>
            <NavLink
              to="signup"
              className={({ isActive }) =>
                isActive ? style.activeStyle : style.inActiveStyle
              }
            >
              <button className={style.signupbtn}>Sign-up</button>
            </NavLink>
          </div>
        )}
      </nav>
      <div className={style.seprator}></div>
    </>
  );
};

export default Navbar;

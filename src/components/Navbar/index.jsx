import React from "react";
import styles from "./styles.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setIsAdmin, setIsAuth } from "../../store/userSlice";

const Navbar = () => {
  const { isAdmin, isAuth } = useSelector(({ userSlice }) => userSlice);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(setIsAuth(false));
    dispatch(setIsAdmin(false));
    localStorage.removeItem("authorized");
    navigate("/login");
  };

  return (
    <div className={styles.navbar}>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>{isAdmin && <Link to="/admin">Admin-Panel</Link>}</li>
      </ul>
      {isAuth ? (
        <button onClick={handleLogout}>LOGOUT</button>
      ) : (
        <button
          className={styles.loginButton}
          onClick={() => navigate("/login")}
        >
          LOGIN
        </button>
      )}
    </div>
  );
};

export default Navbar;

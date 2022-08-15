import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsersAsync, setIsAdmin, setIsAuth } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { users } = useSelector(({ userSlice }) => userSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = (e) => {
    e.preventDefault();
    const user = users.find(
      ({ userEmail, userPassword }) =>
        userEmail === userData.email && userPassword === userData.password
    );
    setIsError(!user);
    dispatch(setIsAuth(!!user));
    if (user) {
      dispatch(setIsAdmin(user.admin));
      localStorage.setItem(
        "authorized",
        JSON.stringify({ email: user.userEmail, admin: user.admin })
      );
      navigate("/");
    }
  };

  useEffect(() => {
    dispatch(fetchUsersAsync());
  }, []);

  return (
    <div className={styles.container}>
      <form id={styles.contact} onSubmit={handleLogin}>
        <h3>Login</h3>
        <fieldset>
          <input
            value={userData.email}
            onChange={(e) =>
              setUserData((state) => ({ ...state, email: e.target.value }))
            }
            placeholder="Your Email Address"
            type="email"
            tabIndex="2"
            required
          />
        </fieldset>
        <fieldset>
          <input
            value={userData.password}
            onChange={(e) =>
              setUserData((state) => ({ ...state, password: e.target.value }))
            }
            placeholder="Your password"
            type="password"
            tabIndex="3"
            required
          />
        </fieldset>
        <fieldset>
          <button
            name="submit"
            type="submit"
            id="contact-submit"
            data-submit="...Sending"
          >
            Submit
          </button>
        </fieldset>
        {isError && (
          <span style={{ display: "block", color: "red" }}>
            Such user not found
          </span>
        )}
        <Link to={`/registration`}>Registration</Link>
      </form>
    </div>
  );
};

export default Login;

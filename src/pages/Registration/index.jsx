import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createUserAsync,
  fetchUsersAsync,
  setIsAuth,
  setPopUp,
} from "../../store/userSlice";
import { useNavigate } from "react-router-dom";
import AlertDialog from "../../components/AlertDialog";
import { EMPLOYEES } from "../../constants";

const Registration = () => {
  const { users } = useSelector(({ userSlice }) => userSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isActivePost, setIsActivePost] = useState(EMPLOYEES[0].post);
  const [isError, setIsError] = useState(false);
  const [userValue, setUserValue] = useState({
    userEmail: "",
    userPassword: "",
    post: "Developer",
    position: "Junior",
    admin: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = users.find(
      ({ userEmail }) => userEmail === userValue.userEmail
    );
    setIsError(user);
    dispatch(setIsAuth(!user));
    if (!user) {
      const userData = {
        userEmail: userValue.userEmail,
        admin: userValue.admin,
      };
      dispatch(
        createUserAsync({
          ...userData,
          userPassword: userValue.userPassword,
          post: userValue.post,
          position: userValue.position,
        })
      );
      localStorage.setItem("authorized", JSON.stringify(userData));
      setUserValue({
        userEmail: "",
        userPassword: "",
        post: "",
        position: "",
        admin: false,
      });
    }
  };

  const setValue = (e, key) => {
    setUserValue((state) => ({ ...state, [key]: e.target.value }));
  };

  const setPost = (e) => {
    setIsActivePost(e.target.value);
    setValue(e, "post");
  };

  const handleLogin = () => {
    dispatch(setPopUp(false));
    navigate("/");
  };

  useEffect(() => {
    dispatch(fetchUsersAsync());
  }, []);

  return (
    <div className={styles.container}>
      <AlertDialog
        title={"You have succesfully registered"}
        buttonText={"Login"}
        handleClick={handleLogin}
      />
      <form onSubmit={handleSubmit} id={styles.contact}>
        <h3>Registration</h3>
        <fieldset>
          <input
            value={userValue.userEmail}
            onChange={(e) => setValue(e, "userEmail")}
            placeholder="Your Email Address"
            type="email"
            tabIndex="2"
            required
          />
        </fieldset>
        <fieldset>
          <input
            value={userValue.userPassword}
            onChange={(e) => setValue(e, "userPassword")}
            placeholder="Create a password"
            type="password"
            tabIndex="3"
            required
          />
        </fieldset>
        <fieldset>
          <label>Your post</label>
          <select onChange={(e) => setPost(e)}>
            {EMPLOYEES.map(({ post }) => (
              <option key={post} value={post}>
                {post}
              </option>
            ))}
          </select>
        </fieldset>
        <fieldset>
          <label>Your position</label>
          <select onChange={(e) => setValue(e, "position")}>
            {EMPLOYEES.find((post) => post.post === isActivePost).position.map(
              (item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              )
            )}
          </select>
        </fieldset>
        <fieldset>
          {isError && (
            <span style={{ display: "block", color: "red" }}>
              This email address is already registered
            </span>
          )}
          <button name="submit" type="submit">
            Submit
          </button>
        </fieldset>
        <Link to="/login">Go back</Link>
      </form>
      {/*<input type="file" onChange={handleFileUpload}/>*/}
    </div>
  );
};

export default Registration;

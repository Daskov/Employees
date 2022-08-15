import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import AlertDialog from "../../components/AlertDialog";
import { EMPLOYEES } from "../../constants";
import {
  fetchUserToEdit,
  saveEditedUser,
  setPopUp,
} from "../../store/userSlice";
import styles from "./styles.module.scss";

const EditUser = () => {
  const dispatch = useDispatch();
  const { postToEdit } = useSelector(({ userSlice }) => userSlice);
  const navigate = useNavigate();
  const params = useParams();
  const [userValue, setUserValue] = useState(postToEdit);
  const [isActivePost, setIsActivePost] = useState(EMPLOYEES[0].post);

  const setValue = (e, key) => {
    setUserValue((state) => ({ ...state, [key]: e.target.value }));
  };

  const setPost = (e) => {
    setIsActivePost(e.target.value);
    setValue(e, "post");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(saveEditedUser(userValue));
    dispatch(fetchUserToEdit(params.id));
  };

  const handleClick = () => {
    dispatch(setPopUp(false));
    navigate(-1);
  };

  useEffect(() => {
    dispatch(fetchUserToEdit(params.id));
  }, []);

  useEffect(() => {
    if (postToEdit) {
      setUserValue(postToEdit);
    }
  }, [postToEdit]);

  if (!userValue) return <h1>Loading...</h1>;
  return (
    <>
      <AlertDialog
        text={"You have successfully changed user's data"}
        buttonText={"Close"}
        handleClick={handleClick}
      />
      <form onSubmit={handleSubmit} id={styles.contact}>
        <h3>Edit</h3>
        <fieldset>
          <input
            value={userValue.userEmail}
            onChange={(e) => setValue(e, "userEmail")}
            placeholder="Your Email Address"
            type="email"
            required
          />
        </fieldset>
        <fieldset>
          <input
            value={userValue.userPassword}
            onChange={(e) => setValue(e, "userPassword")}
            placeholder="Create a password"
            type="text"
            required
          />
        </fieldset>

        <fieldset className={styles.checkbox}>
          <input
            onChange={(e) =>
              setUserValue((state) => ({ ...state, admin: !state.admin }))
            }
            type="checkbox"
            checked={userValue.admin}
          />
          <label>Admin</label>
        </fieldset>
        <fieldset>
          <label>Your post</label>
          <select value={userValue.post} onChange={(e) => setPost(e)}>
            {EMPLOYEES.map(({ post }) => (
              <option key={post} value={post}>
                {post}
              </option>
            ))}
          </select>
        </fieldset>
        <fieldset>
          <label>Your position</label>
          <select
            value={userValue.position}
            onChange={(e) => setValue(e, "position")}
          >
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
          <button name="submit" type="submit">
            Save
          </button>
        </fieldset>
        <Link to={-1}>Go back</Link>
      </form>
    </>
  );
};

export default EditUser;

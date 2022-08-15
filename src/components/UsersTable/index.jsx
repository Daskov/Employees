import React, { useEffect } from "react";
import styles from "./styles.module.scss";
import {
  fetchUsersAsync,
  setPopUp,
  deleteUserAsync,
} from "../../store/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import AlertDialog from "../AlertDialog";

const UsersTable = () => {
  const { users } = useSelector(({ userSlice }) => userSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsersAsync());
  }, []);

  if (!users) return <h2>Loading...</h2>;

  return (
    <div className={styles.table}>
      <AlertDialog
        title={"You successfully deleted employee"}
        buttonText={"Ok"}
        handleClick={() => dispatch(setPopUp(false))}
      />
      <table id={styles.customers}>
        <tbody>
          <tr>
            <th>Email</th>
            <th>Password</th>
            <th>Post</th>
            <th>Position</th>
            <th width="20%">Actions</th>
          </tr>
          {users.map((item) => (
            <tr key={item.id}>
              <td>{item.userEmail}</td>
              <td>{item.userPassword}</td>
              <td>{item.post}</td>
              <td>{item.position}</td>
              <td>
                <Link to={`/admin-edit/${item.id}`}>
                  <button className={styles.edit}>EDIT</button>
                </Link>
                <button
                  onClick={() => dispatch(deleteUserAsync(item.id))}
                  className={styles.delete}
                >
                  DELETE
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import PostCard from "../../components/PostCard";
import { fetchPostsAsync } from "../../store/userSlice";

import styles from "./styles.module.scss";
const Main = () => {
  const { posts } = useSelector(({ userSlice }) => userSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPostsAsync());
  }, []);

  return (
    <div className={styles.cards}>
      {posts?.map((item) => (
        <PostCard key={item.id} title={item.title} body={item.body} />
      ))}
    </div>
  );
};

export default Main;

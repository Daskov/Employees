import React from "react";
import styles from "./styles.module.scss";

const PostCard = ({ title, body }) => {
  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <h3>{title}</h3>
        <p>{body}</p>
      </div>
    </div>
  );
};

export default PostCard;

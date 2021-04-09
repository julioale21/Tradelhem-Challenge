import React from "react";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from "./List.module.scss";

const List: React.FC = ({ children }) => {
  return <ul className={styles.container}>{children}</ul>;
};

export default List;

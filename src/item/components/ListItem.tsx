import React from "react";

import styles from "./ListItem.module.scss";

interface Props {
  onRemove: VoidFunction;
}

const ListItem: React.FC<Props> = ({ children, onRemove }) => {
  return (
    <li className={styles.container}>
      <span>{children}</span>
      <button onClick={onRemove}>Delete</button>
    </li>
  );
};

export default ListItem;

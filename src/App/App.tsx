import * as React from "react";

import api from "../item/api";
import {Item} from "../item/types";
import Button from "../ui/controls/buttons";

import styles from "./App.module.scss";

enum Status {
  Init = "init",
  Success = "success",
}

const App: React.FC = () => {
  const [items, setItems] = React.useState<Item[]>([]);
  const [status, setStatus] = React.useState<Status>(Status.Init);

  React.useEffect(() => {
    api.list().then((items) => {
      setItems(items);
      setStatus(Status.Success);
    });
  }, []);

  function handleDeleteItem(id: number) {
    api.remove(id).then(() => setItems((items) => items.filter((item) => item.id !== id)));
  }

  if (status === Status.Init) return <span>Loading...</span>;

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1>Supermarket List</h1>
        <h3>{items.length} items</h3>
      </header>

      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <span>{item.text}</span>
            <button onClick={() => handleDeleteItem(item.id)}>delete</button>
          </li>
        ))}
      </ul>

      <Button colorScheme="primary">Add Item</Button>
    </main>
  );
};

export default App;

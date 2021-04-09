import * as React from "react";

import api from "../item/api";
import { Item } from "../item/types";
import Button from "../ui/controls/buttons";
import Modal, { ModalFooter } from "../ui/controls/modal";
import TextField from "../ui/inputs/text-field";

import styles from "./App.module.scss";

enum Status {
  Init = "init",
  Success = "success",
}

interface Form extends HTMLFormElement {
  text: HTMLInputElement;
}

const App: React.FC = () => {
  const [items, setItems] = React.useState<Item[]>([]);
  const [status, setStatus] = React.useState<Status>(Status.Init);
  const [isModalVisible, toggleModal] = React.useState<boolean>(false);

  React.useEffect(() => {
    api.list().then((items) => {
      setItems(items);
      setStatus(Status.Success);
    });
  }, []);

  function handleDeleteItem(id: number) {
    api.remove(id).then(() => setItems((items) => items.filter((item) => item.id !== id)));
  }

  function add(event: React.FormEvent<Form>) {
    event.preventDefault();
    const text = event.currentTarget.text.value.trim();

    if (!text) return;

    api.create(text).then((item) => {
      setItems((items) => items.concat(item));
      toggleModal(false);
    });
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

      <Button autoFocus colorScheme="primary" onClick={() => toggleModal(true)}>
        Add Item
      </Button>
      {isModalVisible && (
        <Modal onClose={() => toggleModal(false)}>
          <form onSubmit={add}>
            <h2>Add item</h2>
            <TextField autoFocus name="text" type="text" />
            <ModalFooter>
              <Button type="button" onClick={() => toggleModal(false)}>
                Cancel
              </Button>
              <Button colorScheme="primary" type="submit">
                Add
              </Button>
            </ModalFooter>
          </form>
        </Modal>
      )}
    </main>
  );
};

export default App;

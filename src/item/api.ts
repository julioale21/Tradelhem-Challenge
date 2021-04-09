import { Item } from "./types";
/* 
const MOCK: Item[] = [
  { id: 1, text: "helado de pejelagarto" },
  { id: 2, text: "sandwich de pejelagarto" },
  { id: 3, text: "Sushi de pejelagarto" },
]; */

function getFromLocalStorage(key: string) {
  let items: Item[] = [];

  const result = localStorage.getItem(key) || "";

  if (result !== "") items = JSON.parse(result);

  return items;
}

export default {
  list: (): Promise<Item[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const items: Item[] = getFromLocalStorage("items");

        return resolve(items);
      }, 2000);
    });
  },

  create: (text: Item["text"]): Promise<Item> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const item: Item = { id: +new Date(), text };
        const items: Item[] = getFromLocalStorage("items");

        items.push(item);

        localStorage.setItem("items", JSON.stringify(items));

        return resolve(item);
      }, 1000);
    });
  },

  remove: (id: Item["id"]): Promise<Item["id"]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const items: Item[] = getFromLocalStorage("items");

        localStorage.setItem("items", JSON.stringify(items.filter((item) => item.id !== id)));

        return resolve(id);
      }, 1000);
    });
  },
};

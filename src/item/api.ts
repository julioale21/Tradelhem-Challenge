import {Item} from "./types";

const MOCK: Item[] = [
  {id: 1, text: "helado de pejelagarto"},
  {id: 2, text: "sandwich de pejelagarto"},
  {id: 3, text: "Sushi de pejelagarto"},
];

export default {
  list: (): Promise<Item[]> => Promise.resolve(MOCK),
  create: (text: Item["text"]): Promise<Item> => Promise.resolve({id: +new Date(), text}),
  remove: (id: Item["id"]): Promise<Item["id"]> => Promise.resolve(id),
};

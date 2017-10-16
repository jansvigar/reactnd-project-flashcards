import { AsyncStorage } from 'react-native';

export const saveDeckTitle = title => {
  const newDeck = {
    title,
    questions: [],
  };
  AsyncStorage.setItem(title, JSON.stringify(newDeck));
};

/* eslint-disable function-paren-newline */
export const getDecks = () =>
  AsyncStorage.getAllKeys()
    .then(keys => AsyncStorage.multiGet(keys))
    .then(stores =>
      stores.map((result, i, store) => {
        // const key = store[i][0];
        const value = JSON.parse(store[i][1]);
        // const deck = { [key]: value };
        return value;
      }),
    );

export const getDeck = title => AsyncStorage.getItem(title);

export const addCardToDeck = (title, card) => {
  const delta = {
    [title]: {
      questions: [card],
    },
  };
  return AsyncStorage.mergeItems(title, JSON.stringify(delta));
};

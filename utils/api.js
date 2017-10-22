import { AsyncStorage } from 'react-native';

export const saveDeckTitle = title => {
  const newDeck = {
    title,
    questions: [],
  };
  AsyncStorage.setItem(title, JSON.stringify(newDeck));
};

export const getDecks = () =>
  AsyncStorage.getAllKeys()
    .then(keys => {
      const filteredKeys = keys.filter(key => key !== 'flashcards:notification');
      return AsyncStorage.multiGet(filteredKeys);
    })
    .then(stores => {
      if (stores.length > 0) {
        return stores.map((result, i, store) => {
          const value = JSON.parse(store[i][1]);
          return value;
        });
      }
      return [];
    });

export const getDeck = title => AsyncStorage.getItem(title).then(result => JSON.parse(result));

export const addCardToDeck = (deck, card) => {
  const delta = {
    questions: deck.questions.concat(card),
  };
  return AsyncStorage.mergeItem(deck.title, JSON.stringify(delta));
};

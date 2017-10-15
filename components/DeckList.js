import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import Deck from './Deck';

const DeckList = () => (
  <FlatList
    contentContainerStyle={styles.container}
    data={[{ key: 1, cards: 4 }, { key: 2, cards: 3 }]}
    renderItem={({ item }) => <Deck title={`Deck ${item.key}`} cardsCount={item.cards} />}
  />
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    margin: 20,
    marginTop: 40,
  },
});

export default DeckList;

import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import Deck from './Deck';

const DeckList = () => (
  <ScrollView contentContainerStyle={styles.container}>
    <Deck title="Deck 1" cardsCount={4} />
    <Deck title="Deck 2" cardsCount={5} />
    <Deck title="Deck 3" cardsCount={1} />
    <Deck title="Deck 4" cardsCount={3} />
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 50,
    marginRight: 50,
  },
});

export default DeckList;

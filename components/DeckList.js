import React, { Component } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import Deck from './Deck';
import { getDecks } from '../utils/api';

class DeckList extends Component {
  state = {
    decks: [],
  };
  componentDidMount() {
    getDecks().then(decks => {
      this.setState({ decks });
    });
  }
  render() {
    return (
      <FlatList
        contentContainerStyle={styles.container}
        data={this.state.decks}
        keyExtractor={item => item.title}
        renderItem={({ item }) => (
          <Deck title={`Deck ${item.title}`} cardsCount={item.questions.length} />
        )}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    margin: 20,
    marginTop: 40,
  },
});

export default DeckList;

import React, { Component } from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import Deck from './Deck';
import { getDecks } from '../utils/api';

class DeckList extends Component {
  state = {
    decks: [],
  };
  componentDidMount() {
    this.updateDeckList();
  }
  componentWillReceiveProps(newProps) {
    if (newProps.screenProps.route_index === 0) {
      this.updateDeckList();
    }
  }
  updateDeckList = () => {
    getDecks().then(decks => {
      if (decks && decks.length > 0) {
        this.setState({ decks });
      }
    });
  };
  render() {
    return this.state.decks && this.state.decks.length > 0 ? (
      <FlatList
        contentContainerStyle={styles.container}
        data={this.state.decks}
        keyExtractor={item => item.title}
        renderItem={({ item }) => (
          <Deck title={`${item.title}`} cardsCount={item.questions.length} />
        )}
      />
    ) : (
      <View style={styles.container}>
        <Text>No deck found. Add them now to start quizzing</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    margin: 10,
  },
});

export default DeckList;

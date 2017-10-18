import React, { Component } from 'react';
import { shape, string, number } from 'prop-types';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { darkblue, darkyellow } from '../utils/colors';

class DeckDetail extends Component {
  static propTypes = {
    navigation: shape({
      state: shape({
        params: shape({
          title: string.isRequired,
          cardsCount: number.isRequired,
        }).isRequired,
      }).isRequired,
    }).isRequired,
  };
  render() {
    const { navigation: { state } } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{state.params.title}</Text>
        <Text style={styles.cardCount}>{state.params.cardsCount} cards</Text>
        <TouchableOpacity style={styles.addCardBtn}>
          <Text style={{ fontSize: 32, color: '#fff' }}>Add Card</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.startQuizBtn}>
          <Text style={{ fontSize: 32, color: '#fff' }}>Start Quiz</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default DeckDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 56,
    fontWeight: 'bold',
  },
  cardCount: {
    fontSize: 36,
    color: '#aca7a7',
    marginBottom: 60,
  },
  addCardBtn: {
    width: 250,
    height: 60,
    marginBottom: 10,
    backgroundColor: darkblue,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 2,
    shadowOpacity: 0.8,
    elevation: 3,
  },
  startQuizBtn: {
    width: 250,
    height: 60,
    backgroundColor: darkyellow,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 2,
    shadowOpacity: 0.8,
    elevation: 3,
  },
});

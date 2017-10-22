import React, { Component } from 'react';
import { shape, string, func } from 'prop-types';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { darkblue, darkyellow, black } from '../utils/colors';
import { getDeck } from '../utils/api';

class DeckDetail extends Component {
  static propTypes = {
    navigation: shape({
      navigate: func.isRequired,
      state: shape({
        params: shape({
          title: string.isRequired,
        }).isRequired,
      }).isRequired,
    }).isRequired,
  };
  state = {
    deck: {},
  };
  componentDidMount() {
    this.getDeckInfo();
  }
  getDeckInfo = () => {
    const { title } = this.props.navigation.state.params;
    getDeck(title).then(deck => {
      this.setState({ deck });
    });
  };
  _handleAddNewCard = () => {
    const { navigate } = this.props.navigation;
    navigate('AddCard', { deck: this.state.deck, onSuccessAdd: this.getDeckInfo });
  };
  _handleStartQuiz = () => {
    const { navigate } = this.props.navigation;
    const { questions } = this.state.deck;
    if (questions.length) {
      navigate('StartQuiz', { deck: this.state.deck });
    } else {
      Alert.alert('No card found', 'Please add card to the deck to enable the quiz');
    }
  };
  render() {
    const { title, questions } = this.state.deck;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.cardCount}>
          {questions ? questions.length : 0} {questions && questions.length > 1 ? 'cards' : 'card'}
        </Text>
        <TouchableOpacity onPress={this._handleAddNewCard} style={styles.addCardBtn}>
          <Text style={{ fontSize: 32, color: '#fff' }}>Add Card</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this._handleStartQuiz} style={styles.startQuizBtn}>
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
    shadowColor: black,
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
    shadowColor: black,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 2,
    shadowOpacity: 0.8,
    elevation: 3,
  },
});

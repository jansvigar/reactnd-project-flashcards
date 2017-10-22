import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { string, number, shape, func } from 'prop-types';
import { withNavigation } from 'react-navigation';
import { darkblue, lightblue } from '../utils/colors';

const Deck = ({ title, cardsCount, navigation }) => {
  const _handleDeckPress = () => {
    navigation.navigate('DeckDetail', { title });
  };
  return (
    <TouchableOpacity onPress={_handleDeckPress} style={styles.container}>
      <View style={styles.deckTitleContainer}>
        <Text style={styles.deckTitle}>{title}</Text>
      </View>
      <View style={styles.cardsCountContainer}>
        <Text style={styles.cardsCount}>{cardsCount} cards</Text>
      </View>
    </TouchableOpacity>
  );
};

Deck.propTypes = {
  title: string.isRequired,
  cardsCount: number.isRequired,
  navigation: shape({ navigate: func.isRequired }).isRequired,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: lightblue,
    borderWidth: 0.5,
    borderColor: darkblue,
    borderRadius: 8,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: darkblue,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 2,
    shadowOpacity: 0.8,
    elevation: 3,
  },
  deckTitleContainer: {
    justifyContent: 'center',
  },
  deckTitle: {
    fontSize: 28,
    textAlign: 'center',
  },
  cardsCountContainer: {
    justifyContent: 'center',
  },
  cardsCount: {
    fontSize: 20,
    color: '#a2a2a2',
    textAlign: 'center',
  },
});

export default withNavigation(Deck);

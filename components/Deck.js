import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { string, number, shape, func } from 'prop-types';
import { withNavigation } from 'react-navigation';
import { lightblue } from '../utils/colors';

const Deck = ({ title, cardsCount, navigation }) => {
  const _handleDeckPress = () => {
    navigation.navigate('DeckDetail', { title });
  };
  return (
    <TouchableOpacity onPress={_handleDeckPress} style={styles.container}>
      <Text>{title}</Text>
      <Text>{cardsCount} cards</Text>
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
    borderWidth: 0.5,
    borderColor: lightblue,
    borderRadius: 8,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: lightblue,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 2,
    shadowOpacity: 0.8,
    elevation: 3,
  },
});

export default withNavigation(Deck);

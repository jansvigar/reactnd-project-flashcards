import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const Deck = ({ title, cardsCount }) => (
  <View style={styles.container}>
    <Text>{title}</Text>
    <Text>{cardsCount} cards</Text>
  </View>
);

Deck.propTypes = {
  title: PropTypes.string.isRequired,
  cardsCount: PropTypes.number.isRequired,
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 0.5,
    borderColor: '#8ACFFF',
    borderRadius: 4,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Deck;

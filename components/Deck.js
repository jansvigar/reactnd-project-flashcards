import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { lightblue } from '../utils/colors';

const Deck = ({ title, cardsCount }) => (
  /* TODO: add onPress to the TouchableOpacity */
  <TouchableOpacity style={styles.container}>
    <Text>{title}</Text>
    <Text>{cardsCount} cards</Text>
  </TouchableOpacity>
);

Deck.propTypes = {
  title: PropTypes.string.isRequired,
  cardsCount: PropTypes.number.isRequired,
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

export default Deck;

import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

Deck.propTypes = {
  title: PropTypes.string.isRequired,
};

const Deck = props => (
  <View>
    <Text>{props.title}</Text>
  </View>
);

export default Deck;

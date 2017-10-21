import React, { Component } from 'react';
import { string } from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';

class QuizScore extends Component {
  static propTypes = {
    score: string.isRequired,
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 24 }}>This is your score:</Text>
        <Text style={{ fontSize: 32 }}>{this.props.score}%</Text>
      </View>
    );
  }
}

export default QuizScore;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

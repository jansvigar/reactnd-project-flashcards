import React, { Component } from 'react';
import { string, func } from 'prop-types';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { setLocalNotification, clearLocalNotification } from '../utils/helpers';
import { black, darkblue, darkyellow } from '../utils/colors';

class QuizScore extends Component {
  static propTypes = {
    score: string.isRequired,
    startOver: func.isRequired,
    goBackToDeck: func.isRequired,
  };
  state = {
    scoreAnim: new Animated.Value(0),
  };
  componentDidMount() {
    clearLocalNotification().then(setLocalNotification);
    this.state.scoreAnim.addListener(({ value }) => {
      const score = Number(value).toFixed(2);
      this.setState({ score });
    });
    Animated.timing(this.state.scoreAnim, {
      toValue: this.props.score,
      duration: 500,
      delay: 1000,
    }).start();
  }
  componentWillUnmount() {
    this.state.scoreAnim.removeAllListeners();
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 32 }}>Your score is:</Text>
        <Animated.Text style={{ fontSize: 40, marginBottom: 20 }}>
          {this.state.score || '0.00'}%
        </Animated.Text>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: darkblue }]}
          onPress={this.props.startOver}
        >
          <Text style={{ fontSize: 32, color: '#fff' }}>Start Over</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: darkyellow }]}
          onPress={this.props.goBackToDeck}
        >
          <Text style={{ fontSize: 32, color: '#fff' }}>Back to Deck</Text>
        </TouchableOpacity>
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
  button: {
    width: 250,
    height: 60,
    marginBottom: 10,
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

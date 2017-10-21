import React, { Component } from 'react';
import { string } from 'prop-types';
import { View, Text, StyleSheet, Animated } from 'react-native';

class QuizScore extends Component {
  static propTypes = {
    score: string.isRequired,
  };
  state = {
    scoreAnim: new Animated.Value(0),
  };
  componentDidMount() {
    this.state.scoreAnim.addListener(({ value }) => {
      const score = Number(value).toFixed(2);
      this.setState({ score });
    });
    Animated.timing(this.state.scoreAnim, {
      toValue: this.props.score,
      duration: 500,
    }).start();
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 24 }}>This is your score:</Text>
        <Animated.Text style={{ fontSize: 32 }}>{this.state.score}%</Animated.Text>
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

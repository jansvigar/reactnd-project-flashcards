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
      delay: 1000,
    }).start();
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 24 }}>Your score is:</Text>
        <Animated.Text style={{ fontSize: 32 }}>{this.state.score || '0'}%</Animated.Text>
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

import React, { Component } from 'react';
import { shape, array } from 'prop-types';
import { View, Text, TouchableOpacity, StyleSheet, Button, Animated } from 'react-native';
import QuizScore from './QuizScore';
import { black, white, green, red } from '../utils/colors';
import { calculateScore } from '../utils/helpers';

class Quiz extends Component {
  static propTypes = {
    navigation: shape({
      state: shape({
        params: shape({
          deck: shape({ questions: array.isRequired }),
        }),
      }),
    }).isRequired,
  };
  state = {
    cardIdx: 0,
    correctAnswer: 0,
    showAnswer: false,
  };
  componentWillMount() {
    this.animatedValue = new Animated.Value(0);
    this.flipValue = 0;
    this.animatedValue.addListener(({ value }) => {
      this.flipValue = value;
    });
    this.animatedTranslateValue = new Animated.Value(0);
    this.flipInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 360],
      outputRange: ['0deg', '360deg'],
    });
    this.opacityInterpolate = this.animatedTranslateValue.interpolate({
      inputRange: [-400, 0, 400],
      outputRange: [0, 1, 0],
    });
  }
  _flipCard = () => {
    if (this.flipValue >= 180) {
      Animated.spring(this.animatedValue, {
        toValue: 0,
        friction: 8,
        tension: 10,
      }).start();
    } else {
      Animated.spring(this.animatedValue, {
        toValue: 360,
        friction: 8,
        tension: 10,
      }).start();
    }
  };
  _swipe = () => {
    Animated.sequence([
      Animated.timing(this.animatedTranslateValue, {
        toValue: 400,
        duration: 500,
      }),
      Animated.timing(this.animatedTranslateValue, {
        toValue: 0,
        duration: 500,
      }),
    ]).start();
  };
  _toggleAnswer = () => {
    this._flipCard();
    setTimeout(() => {
      this.setState({ showAnswer: !this.state.showAnswer });
    }, 250);
  };
  _handleButtonClick = isCorrectAnswer => () => {
    const correctAnswer = isCorrectAnswer ? this.state.correctAnswer + 1 : this.state.correctAnswer;
    const cardIdx = this.state.cardIdx + 1;
    this._swipe();
    setTimeout(() => {
      this.setState({ correctAnswer, cardIdx, showAnswer: false });
    }, 500);
  };
  _renderQuizView = () => {
    const { questions } = this.props.navigation.state.params.deck;
    if (this.state.showAnswer) {
      return (
        <View style={{ flex: 1 }}>
          <View>
            <Text>{`${this.state.cardIdx + 1} / ${questions.length}`}</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.answer}>{questions[this.state.cardIdx].answer}</Text>
            <Button onPress={this._toggleAnswer} title="View Question" />
          </View>
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: red }]}
              onPress={this._handleButtonClick(false)}
            >
              <Text style={styles.buttonText}>Incorrect</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: green }]}
              onPress={this._handleButtonClick(true)}
            >
              <Text style={styles.buttonText}>Correct</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
    return (
      <View style={{ flex: 1 }}>
        <View>
          <Text>{`${this.state.cardIdx + 1} / ${questions.length}`}</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.question}>{questions[this.state.cardIdx].question}</Text>
          <Button onPress={this._toggleAnswer} title="View Answer" />
        </View>
      </View>
    );
  };
  render() {
    const animatedStyle = {
      transform: [{ rotateY: this.flipInterpolate }, { translateX: this.animatedTranslateValue }],
      opacity: this.opacityInterpolate,
    };
    const { questions } = this.props.navigation.state.params.deck;
    return (
      <Animated.View style={[styles.container, animatedStyle]}>
        {this.state.cardIdx < questions.length ? (
          this._renderQuizView()
        ) : (
          <QuizScore score={calculateScore(this.state.correctAnswer, questions.length)} />
        )}
      </Animated.View>
    );
  }
}

export default Quiz;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    padding: 20,
    borderWidth: 0.5,
    borderColor: black,
    borderRadius: 8,
    backgroundColor: white,
    shadowColor: black,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 2,
    shadowOpacity: 0.8,
    elevation: 3,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonGroup: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  question: {
    fontSize: 32,
    textAlign: 'center',
    marginBottom: 10,
  },
  answer: {
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 10,
  },
  button: {
    padding: 10,
    width: 100,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    marginLeft: 5,
    marginRight: 5,
    shadowColor: black,
    shadowOffset: { width: 0.5, height: 0.5 },
    shadowRadius: 1,
    shadowOpacity: 0.8,
    elevation: 2,
  },
  buttonText: {
    color: white,
    fontSize: 18,
  },
});

import React, { Component } from 'react';
import { shape, array } from 'prop-types';
import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';
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
  _toggleAnswer = () => {
    this.setState({ showAnswer: !this.state.showAnswer });
  };
  _handleButtonClick = isCorrectAnswer => () => {
    const correctAnswer = isCorrectAnswer ? this.state.correctAnswer + 1 : this.state.correctAnswer;
    const cardIdx = this.state.cardIdx + 1;
    this.setState({ correctAnswer, cardIdx, showAnswer: false });
  };
  _renderQuizView = () => {
    const { questions } = this.props.navigation.state.params.deck;
    if (this.state.showAnswer) {
      return (
        <View style={{ flex: 1 }}>
          <View style={styles.content}>
            <Text style={styles.answer}>{questions[this.state.cardIdx].answer}</Text>
            <Button onPress={this._toggleAnswer} title="View Question" />
          </View>
          <View style={styles.buttonGroup}>
            <TouchableOpacity style={styles.incorrectBtn} onPress={this._handleButtonClick(false)}>
              <Text style={styles.buttonText}>Incorrect</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.correctBtn} onPress={this._handleButtonClick(true)}>
              <Text style={styles.buttonText}>Correct</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
    return (
      <View style={styles.content}>
        <Text style={styles.question}>{questions[this.state.cardIdx].question}</Text>
        <Button onPress={this._toggleAnswer} title="View Answer" />
      </View>
    );
  };
  render() {
    const { questions } = this.props.navigation.state.params.deck;
    return (
      <View style={styles.container}>
        {this.state.cardIdx < questions.length ? (
          this._renderQuizView()
        ) : (
          <QuizScore score={calculateScore(this.state.correctAnswer, questions.length)} />
        )}
      </View>
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
  correctBtn: {
    backgroundColor: green,
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
  incorrectBtn: {
    backgroundColor: red,
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

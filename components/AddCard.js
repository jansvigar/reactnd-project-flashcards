import React, { Component } from 'react';
import { shape, func, string, array } from 'prop-types';
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { darkblue } from '../utils/colors';
import { addCardToDeck } from '../utils/api';

class AddCard extends Component {
  static propTypes = {
    navigation: shape({
      goBack: func.isRequired,
      state: shape({
        params: shape({
          deck: shape({ title: string.isRequired, questions: array.isrequired }).isRequired,
          onSuccessAdd: func.isRequired,
        }).isRequired,
      }).isRequired,
    }).isRequired,
  };
  state = {
    question: '',
    answer: '',
  };
  _handleSubmitNewCard = () => {
    if (this.state.question && this.state.answer) {
      addCardToDeck(this.props.navigation.state.params.deck, {
        question: this.state.question,
        answer: this.state.answer,
      });
      this.setState({ question: '', answer: '' });
      this.props.navigation.goBack();
      this.props.navigation.state.params.onSuccessAdd();
    }
  };
  render() {
    return (
      <KeyboardAvoidingView style={styles.container}>
        <Text style={styles.label}>Question:</Text>
        <TextInput
          placeholder="Enter new question"
          style={Platform.OS === 'ios' ? styles.inputIOS : styles.inputAndroid}
          onChangeText={question => this.setState({ question })}
          value={this.state.question}
        />
        <Text style={styles.label}>Answer:</Text>
        <TextInput
          placeholder="Enter the answer"
          multiline
          style={Platform.OS === 'ios' ? styles.textAreaIOS : styles.textAreaAndroid}
          onChangeText={answer => this.setState({ answer })}
          value={this.state.answer}
        />
        <TouchableOpacity onPress={this._handleSubmitNewCard}>
          <Text style={styles.button}>Submit</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

export default AddCard;

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  label: {
    marginBottom: 10,
  },
  inputIOS: {
    borderColor: 'black',
    borderWidth: 1,
    height: 37,
    padding: 10,
    marginBottom: 20,
    fontSize: 14,
  },
  inputAndroid: {
    height: 37,
    padding: 10,
    marginBottom: 20,
    fontSize: 14,
  },
  textAreaIOS: {
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    fontSize: 14,
  },
  textAreaAndroid: {
    padding: 10,
    marginBottom: 20,
    fontSize: 14,
  },
  button: {
    backgroundColor: darkblue,
    color: 'white',
    padding: 10,
    marginTop: 10,
    textAlign: 'center',
  },
});

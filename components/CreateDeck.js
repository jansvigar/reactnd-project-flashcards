import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { darkblue } from '../utils/colors';
import { saveDeckTitle } from '../utils/api';

class CreateDeck extends Component {
  static propTypes = {
    navigation: PropTypes.shape({ goBack: PropTypes.func.isRequired }).isRequired,
  };
  state = {
    DeckTitle: '',
  };
  handleSubmitNewDeck = () => {
    if (this.state.DeckTitle) {
      saveDeckTitle(this.state.DeckTitle);
      this.setState({ DeckTitle: '' });
      this.props.navigation.goBack();
    }
  };
  render() {
    return (
      <KeyboardAvoidingView style={styles.container}>
        <Text style={styles.label}>Deck Title:</Text>
        <TextInput
          placeholder="Enter the title for your deck"
          style={Platform.OS === 'ios' ? styles.inputIOS : styles.inputAndroid}
          onChangeText={DeckTitle => this.setState({ DeckTitle })}
          value={this.state.DeckTitle}
        />
        <TouchableOpacity onPress={this.handleSubmitNewDeck}>
          <Text style={styles.button}>Submit</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

export default CreateDeck;

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
  },
  inputAndroid: {
    height: 37,
    padding: 10,
  },
  button: {
    backgroundColor: darkblue,
    color: 'white',
    padding: 10,
    marginTop: 10,
    textAlign: 'center',
  },
});

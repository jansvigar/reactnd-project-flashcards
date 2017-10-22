import React, { Component } from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Constants } from 'expo';
import { MaterialCommunityIcons } from '@expo/vector-icons'; /* eslint import/no-extraneous-dependencies: 0 */
import DeckList from './components/DeckList';
import DeckDetail from './components/DeckDetail';
import CreateDeck from './components/CreateDeck';
import AddCard from './components/AddCard';
import Quiz from './components/Quiz';
import { setLocalNotification } from './utils/helpers';
import { blue, white } from './utils/colors';

const TabNavigation = TabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'My Decks',
      tabBarIcon: ({ tintColor } /* eslint react/prop-types:0 */) => (
        <MaterialCommunityIcons name="cards-outline" size={30} color={tintColor} />
      ),
    },
  },
  NewDeck: {
    screen: CreateDeck,
    navigationOptions: {
      tabBarLabel: 'New Deck',
      tabBarIcon: ({ tintColor } /* eslint react/prop-types:0 */) => (
        <MaterialCommunityIcons name="plus-circle-outline" size={30} color={tintColor} />
      ),
    },
  },
});

const StackNavigatorHeaderStyle = {
  paddingTop: Constants.statusBarHeight,
  height: 40 + Constants.statusBarHeight,
  backgroundColor: white,
};

const StackNavigation = StackNavigator({
  Home: {
    screen: TabNavigation,
    navigationOptions: {
      title: 'FlashCards',
      headerStyle: StackNavigatorHeaderStyle,
    },
  },
  DeckDetail: {
    screen: DeckDetail,
    navigationOptions: {
      title: 'Deck',
      headerStyle: StackNavigatorHeaderStyle,
    },
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      title: 'Add New Card',
      headerStyle: StackNavigatorHeaderStyle,
    },
  },
  StartQuiz: {
    screen: Quiz,
    navigationOptions: {
      title: 'Start Quiz',
      headerStyle: StackNavigatorHeaderStyle,
    },
  },
});

export default class App extends Component {
  componentDidMount() {
    setLocalNotification();
  }
  _onNavigationStateChange = (prevState, newState) => {
    this.setState({ ...this.state, route_index: newState.index });
  };
  render() {
    return (
      <StackNavigation
        onNavigationStateChange={this._onNavigationStateChange}
        screenProps={this.state}
      />
    );
  }
}

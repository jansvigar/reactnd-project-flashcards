import React, { Component } from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import DeckList from './components/DeckList';
import CreateDeck from './components/CreateDeck';

const TabNavigation = TabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'My Decks',
    },
  },
  NewDeck: {
    screen: CreateDeck,
    navigationOptions: {
      tabBarLabel: 'New Deck',
    },
  },
});

const StackNavigation = StackNavigator({
  Home: {
    screen: TabNavigation,
    navigationOptions: {
      title: 'FlashCards',
    },
  },
});

export default class App extends Component {
  render() {
    return <StackNavigation />;
  }
}

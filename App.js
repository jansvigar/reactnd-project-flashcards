import React, { Component } from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import DeckList from './components/DeckList';

const TabNavigation = TabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'My Decks',
    },
  },
});

const StackNavigation = StackNavigator({
  DeckList: {
    screen: TabNavigation,
    navigationOptions: {
      title: 'My Decks',
    },
  },
});

export default class App extends Component {
  render() {
    return <StackNavigation />;
  }
}

import React, { Component } from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { MaterialCommunityIcons } from '@expo/vector-icons'; /* eslint import/no-extraneous-dependencies: 0 */
import DeckList from './components/DeckList';
import CreateDeck from './components/CreateDeck';

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

const StackNavigation = StackNavigator({
  Home: {
    screen: TabNavigation,
    navigationOptions: {
      title: 'FlashCards',
    },
  },
});

export default class App extends Component {
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

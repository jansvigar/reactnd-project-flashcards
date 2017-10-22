import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Constants } from 'expo';
import { MaterialCommunityIcons } from '@expo/vector-icons'; /* eslint import/no-extraneous-dependencies: 0 */
import DeckList from './components/DeckList';
import DeckDetail from './components/DeckDetail';
import CreateDeck from './components/CreateDeck';
import AddCard from './components/AddCard';
import Quiz from './components/Quiz';
import { white } from './utils/colors';

export const TabNavigation = TabNavigator({
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

export const StackNavigation = StackNavigator({
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

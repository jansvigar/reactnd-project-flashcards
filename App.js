import React, { Component } from 'react';
import { setLocalNotification } from './utils/helpers';
import { StackNavigation } from './routes';

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

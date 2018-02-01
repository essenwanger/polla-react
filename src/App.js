import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';
import { StyleProvider } from 'native-base';
import getTheme from './theme/components';
import platform from './theme/variables/platform';
import LoginScene from './scenes/LoginScene';

export default class App extends Component {

  render() {
    return (
      <StyleProvider style={getTheme(platform)}>
      <Router hideNavBar= "true">
        <Scene key="root">
          <Scene key="login" component={LoginScene} hideNavBar={true} initial={true}/>
        </Scene>
      </Router>
      </StyleProvider>
    );
  }
}
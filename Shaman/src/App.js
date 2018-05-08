import React, { Component } from 'react';
import { BackHandler } from 'react-native';
import { Actions, Router, Scene } from 'react-native-router-flux';
import { StyleProvider } from 'native-base';
import getTheme from './theme/components';
import chaman from './theme/variables/chaman';
import LoginScene from './scenes/LoginScene';
import TermsScene from './scenes/TermsScene';
import DashboardScene from './scenes/DashboardScene';
import PhaseScene from './scenes/PhaseScene';
import AboutScene from './scenes/AboutScene';
import DashboardRankScene from './scenes/DashboardRankScene';
import codePush from "react-native-code-push";

export default class App extends Component {

  render() {
    return (
      <StyleProvider style={getTheme(chaman)}>
      <Router hideNavBar= "true">
        <Scene key="root">
          <Scene key="login" component={LoginScene} hideNavBar={true} initial={true}/>
          <Scene key="terms" component={TermsScene} hideNavBar={true}/>
          <Scene key="dashboard" component={DashboardScene} hideNavBar={true}/>
          <Scene key="phase" component={PhaseScene} hideNavBar={true}/>
          <Scene key="about" component={AboutScene} hideNavBar={true}/>
          <Scene key="dashRank" component={DashboardRankScene} hideNavBar={true}/>
        </Scene>
      </Router>
      </StyleProvider>
    );
  }
}

App = codePush(App);
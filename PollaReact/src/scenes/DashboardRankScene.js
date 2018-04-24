import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Container, Tabs, Tab, TabHeading, Icon } from 'native-base';
import Profile from '../components/Profile';
import Fixture from '../components/Fixture';
import Ranking from '../components/Ranking';
import HeaderPolla from '../components/HeaderPolla';
import DashboardScene from './DashboardScene';
import firebase from 'react-native-firebase';

export default class DashboardRankScene extends DashboardScene {

  constructor(props) {
    super(props);
    this.state = {
      user: props.userRank,
      status: ''
    };
  }

  componentWillMount() {
    
  }

  render() {
    var fixture=null;
    if(this.state.status!=''){
      fixture=(<Fixture user={this.state.user} status={'closed'} />);
    }
    return (
      <Container>
        <HeaderPolla pop={true} name={this.state.user.givenName} />
        {fixture}
      </Container>
    );
  }
  
}
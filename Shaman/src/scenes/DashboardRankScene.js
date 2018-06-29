import React, { Component } from 'react';
import { Container } from 'native-base';
import Fixture from '../components/Fixture';
import HeaderPolla from '../components/HeaderPolla';
import firebase from 'react-native-firebase';

export default class DashboardRankScene extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: props.userRank,
      bet: props.bet
    };
  }

  render() {
    return (
      <Container>
        <HeaderPolla pop={true} name={this.state.user.givenName} />
          <Fixture user={this.state.user} bet={this.state.bet} status={'closed'} userBet={this.props.userBet} suffix={this.props.userBet.suffix} />
      </Container>
    );
  }
  
}
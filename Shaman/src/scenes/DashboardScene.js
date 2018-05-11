import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Container, Tabs, Tab, TabHeading, Icon } from 'native-base';
import Profile from '../components/Profile';
import Fixture from '../components/Fixture';
import Ranking from '../components/Ranking';
import HeaderPolla from '../components/HeaderPolla';
import firebase from 'react-native-firebase';

export default class DashboardScene extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
      bet: props.betKey === undefined ? props.user.bets.all[0].betKey : props.betKey,
      status: ''
    };
  }

  componentWillMount() {
    firebase.database().ref('typeBets/all/status/').once('value').then((snapshot)=>{
      this.setState({
        status: snapshot.val()
      });
    });
  }

  render() {
    var fixture=null;
    var ranking=null;
    if(this.state.status!=''){
      fixture=(<Fixture user={this.state.user} bet={this.state.bet} status={this.state.status} />);
      ranking=(<Ranking user={this.state.user} status={this.state.status} />);
    }
    return (
      <Container>
        <HeaderPolla pop={false} name={'Shaman'} />
        <Tabs>
          <Tab heading={ <TabHeading><Icon name="md-football" /></TabHeading>}>
            {fixture}
          </Tab>
          <Tab heading={ <TabHeading><Icon name="md-podium" /></TabHeading>}>
            {ranking}
          </Tab>
          <Tab heading={ <TabHeading><Icon name="md-person" /></TabHeading>}>
            <Profile user={this.state.user} />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}
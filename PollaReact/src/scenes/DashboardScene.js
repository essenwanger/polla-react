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
      status: ''
    };
  }

  componentWillMount() {
    firebase.database().ref('status/').once('value').then((snapshot)=>{
      this.setState({
        status: snapshot.val()
      });
    });
  }

  render() {
    var fixture=null;
    if(this.state.status!=''){
      fixture=(<Fixture user={this.state.user} status={this.state.status} />);
    }
    return (
      <Container>
        <HeaderPolla pop={false} name={'Chaman'} />
        <Tabs>
          <Tab heading={ <TabHeading><Icon name="md-football" /></TabHeading>}>
            {fixture}
          </Tab>
          <Tab heading={ <TabHeading><Icon name="md-podium" /></TabHeading>}>
            <Ranking user={this.state.user} />
          </Tab>
          <Tab heading={ <TabHeading><Icon name="md-person" /></TabHeading>}>
            <Profile user={this.state.user} />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}
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
      user: props.user
    };
  }

  componentDidMount() {

  }

  render() {
    return (
      <Container>
        <HeaderPolla pop={false} name={'Polla'} />
        <Tabs>
          <Tab heading={ <TabHeading><Icon name="md-football" /></TabHeading>}>
            <Fixture />
          </Tab>
          <Tab heading={ <TabHeading><Icon name="md-podium" /></TabHeading>}>
            <Ranking />
          </Tab>
          <Tab heading={ <TabHeading><Icon name="md-person" /></TabHeading>}>
            <Profile />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}
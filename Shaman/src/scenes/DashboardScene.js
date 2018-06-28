import React, { Component } from 'react';
import { Container, Tabs, Tab, TabHeading, Icon } from 'native-base';
import Term from '../components/Term';
import Fixture from '../components/Fixture';
import Ranking from '../components/Ranking';
import HeaderPolla from '../components/HeaderPolla';
import firebase from 'react-native-firebase';

export default class DashboardScene extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
      bet: props.bet === undefined ? props.user.bets[0] : props.bet,      
      status: ''
    };
  }

  componentWillMount() {
    firebase.database().ref('typeBets/'+this.state.bet.type+'/status/').once('value').then((snapshot)=>{
      this.setState({
        status: snapshot.val()
      });
    });
  }

  render() {
    var fixture=null;
    var ranking=null;
    if(this.state.status!=''){
      fixture=(<Fixture user={this.state.user} bet={this.state.bet.betKey} status={this.state.status} suffix={this.state.bet.suffix} userBet={this.state.bet} />);
      ranking=(<Ranking user={this.state.user} status={this.state.status} suffix={this.state.bet.suffix} />);
    }
    return (
        <Container>
          <HeaderPolla pop name={this.state.bet.name} openDrawer={this.openDrawer} />
          <Tabs>
            <Tab heading={ <TabHeading><Icon name="md-football" /></TabHeading>}>
              {fixture}
            </Tab>
            <Tab heading={ <TabHeading><Icon name="md-podium" /></TabHeading>}>
              {ranking}
            </Tab>
            <Tab heading={ <TabHeading><Icon name="paper" /></TabHeading>}>
              <Term codeTypeBet={this.state.bet.type} />
            </Tab>
          </Tabs>
        </Container>
    );
  }
}
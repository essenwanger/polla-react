import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Drawer, Container, Tabs, Tab, TabHeading, Icon } from 'native-base';
import Term from '../components/Term';
import Fixture from '../components/Fixture';
import Ranking from '../components/Ranking';
import MenuSideBar from '../components/MenuSideBar';
import HeaderPolla from '../components/HeaderPolla';
import firebase from 'react-native-firebase';

export default class DashboardScene extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
      bet: props.betKey === undefined ? props.user.bets[0].betKey : props.betKey,      
      status: ''
    };
    this.closeDrawer = this.closeDrawer.bind(this);
    this.openDrawer = this.openDrawer.bind(this);
  }

  componentWillMount() {
    firebase.database().ref('typeBets/all/status/').once('value').then((snapshot)=>{
      this.setState({
        status: snapshot.val()
      });
    });
  }

  componentDidMount() {
    this.openDrawer();
  }
  
  closeDrawer() {
    this.drawer._root.close()
  };

  openDrawer(){
    this.drawer._root.open()
  };

  render() {
    var fixture=null;
    var ranking=null;
    if(this.state.status!=''){
      fixture=(<Fixture user={this.state.user} bet={this.state.bet} status={this.state.status} />);
      ranking=(<Ranking user={this.state.user} status={this.state.status} />);
    }
    return (
      <Drawer
        ref={(ref) => { this.drawer = ref; }}
        content={<MenuSideBar navigator={this.navigator} user={this.state.user} />}
        onClose={this.closeDrawer} >
        <Container>
          <HeaderPolla pop={false} name={'Shaman'} openDrawer={this.openDrawer} />
          <Tabs>
            <Tab heading={ <TabHeading><Icon name="md-football" /></TabHeading>}>
              {fixture}
            </Tab>
            <Tab heading={ <TabHeading><Icon name="md-podium" /></TabHeading>}>
              {ranking}
            </Tab>
            <Tab heading={ <TabHeading><Icon name="paper" /></TabHeading>}>
              <Term codeTypeBet={'all'} />
            </Tab>
          </Tabs>
        </Container>
      </Drawer>
    );
  }
}
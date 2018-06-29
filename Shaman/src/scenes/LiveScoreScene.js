import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { BackHandler } from 'react-native';
import { Drawer, Container, Icon, Content, Card, CardItem, 
  Body, Text, Thumbnail, Header, Left, Button, Title, Right } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import LiveScoreMatch from '../components/LiveScoreMatch';
import firebase from 'react-native-firebase';
import MenuSideBar from '../components/MenuSideBar';

export default class LiveScoreScene extends Component {

  constructor(props) {
    super(props);
    this.state = {
      liveScore:[],
      drawer: false
    };
    this.closeDrawer = this.closeDrawer.bind(this);
    this.openDrawer = this.openDrawer.bind(this);
    this.onBackPress = this.onBackPress.bind(this);
  }

  componentWillMount () {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  componentWillUnmount () {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  onBackPress () {
    if(this.state.drawer){
      this.setState({
        drawer: false
      });
      this.drawer._root.close();
      return true;
    }
    return false;
  }

  componentDidMount() {
    firebase.database().ref('liveScore').once('value').then((snapshot)=>{
      var liveScore=[];
      snapshot.forEach((childSnapshot)=>{
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();
        liveScore.push(childData);
      });
      this.setState({liveScore: liveScore});
    });
  }

  closeDrawer() {
    this.setState({
      drawer: false
    });
    this.drawer._root.close()
  };
 
  openDrawer(){
    this.setState({
      drawer: true
    });
    this.drawer._root.open()
  };

  render() {
    var items=null;
    items=this.state.liveScore.map((item, key) => (
      <LiveScoreMatch key={key} data={item} />
    ));
    return (
      <Drawer
        ref={(ref) => { this.drawer = ref; }}
        content={<MenuSideBar navigator={this.navigator} user={this.props.user} closeDrawer={this.closeDrawer} />}
        onClose={this.closeDrawer} >
        <Container>
          <Header>
            <Left>
              <Button transparent onPress={this.openDrawer} >
                <Icon name='menu' />
              </Button>
            </Left>
            <Body style={{flex: 3}}>
              <Title>Shaman</Title>
            </Body>
            <Right/>
          </Header>
          <Content>
            {items}
          </Content>
        </Container>
      </Drawer>
    );
  }
}
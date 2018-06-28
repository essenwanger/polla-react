import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Drawer, Container, Icon, Content, Card, CardItem, 
  Body, Text, Thumbnail, Header, Left, Button, Title, Right } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Flag } from '../components/Helpers';
import firebase from 'react-native-firebase';
import MenuSideBar from '../components/MenuSideBar';

export default class LiveScoreScene extends Component {

  constructor(props) {
    super(props);
    this.teamFlag1 = Flag('RUS');
    this.teamFlag2 = Flag('PER');
    this.state = {
      liveScore:[]
    };
    this.closeDrawer = this.closeDrawer.bind(this);
    this.openDrawer = this.openDrawer.bind(this);
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
    this.openDrawer();
  }

  closeDrawer() {
    this.drawer._root.close()
  };
 
  openDrawer(){
    this.drawer._root.open()
  };

  render() {
    var items=null;
    items=this.state.liveScore.map((item, key) => (
      <Card key={key}>
        <CardItem>
          <Grid>
            <Row>
              <Col>
                <Body style={{ marginBottom: 10 , alignItems: 'center'}}>
                  <Text note style={{ textAlign: 'center'}}>Live Score</Text>
                </Body>
              </Col>
            </Row>
            <Row>
              <Col style={{flexDirection: 'row'}} size={30}>
                <Thumbnail source={this.teamFlag1} 
                style={{ borderColor: '#000000', borderWidth: 0.2}}/>
                <Body style={{justifyContent: 'flex-start', marginLeft: 10, marginTop: 10}}>
                  <Text>{item.teamName1}</Text>
                </Body>
              </Col>
              <Col size={10}>
                <Body style={{justifyContent: 'center'}}>
                  <Text>{item.scoreTeam1}</Text>
                  <Text>{item.scorePenaltyTeam1}</Text>
                </Body>
              </Col>
              <Col style={{alignItems: 'flex-end'}} size={10}>
                <Body style={{justifyContent: 'center', alignItems: 'flex-end'}}>
                  <Text>{item.scoreTeam2}</Text>
                  <Text>{item.scorePenaltyTeam2}</Text>
                </Body>
              </Col>
              <Col style={{flexDirection: 'row'}} size={30}>
                <Body style={{justifyContent: 'flex-start', alignItems: 'flex-end', marginRight: 10, marginTop: 10}}>
                  <Text>{item.teamName2}</Text>
                </Body>
                <Thumbnail source={this.teamFlag2} 
                style={{ borderColor: '#000000', borderWidth: 0.2}}/>
              </Col>
            </Row>
            <Row>
              <Col>
                <Body style={{ marginBottom: 10 , alignItems: 'center'}}>
                  <Text note style={{ textAlign: 'center'}}>{item.matchTime}</Text>
                </Body>
              </Col>
            </Row>
          </Grid>
        </CardItem>
      </Card>
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
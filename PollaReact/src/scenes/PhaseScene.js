import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Container, Tabs, Tab, TabHeading, Icon, Content, Card, CardItem, Left, Body, Right, Grid, Col,
  Text, Button, Footer, FooterTab } from 'native-base';
import HeaderPolla from './../components/HeaderPolla';
import Match from './../components/Match';
import PositionTableTeam from './../components/PositionTableTeam';
import firebase from 'react-native-firebase';

export default class PhaseScene extends Component {

  constructor(props) {
    super(props);
    this.onPressButton = this.onPressButton.bind(this);
    this.onScore = this.onScore.bind(this);
    this.state = {
      status: this.props.status,
      matches: [],
      positionTable: []
    };
  }

  onPressButton(position, group, name, order){
    Actions.refresh({user: this.props.user, group: group, status: this.state.status, 
      groupName: name, order: order, navigateGroups: this.props.navigateGroups,
      position: position});
  }

  onScore(id, team, score){
    if(team==='1'){
      firebase.database().ref('/users/'+this.props.user.userID+'/bets/0/matches/'+id).update({
        scoreTeam1: score
      });
    }else{
      firebase.database().ref('/users/'+this.props.user.userID+'/bets/0/matches/'+id).update({
        scoreTeam2: score
      });
    }
  }

  componentWillMount() {
    var userID = this.props.user.userID;
    var group = this.props.group;
    var order = this.props.order;
    firebase.database().ref('users/'+userID+'/bets/0/matches/')
    .orderByChild(order).equalTo(group).once('value').then((snapshot)=>{
      var matches = [];
      snapshot.forEach((childSnapshot)=>{
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();
        childData.key=childKey;
        matches.push(childData);
      });
      this.setState({
        matches: matches
      });
    });
    firebase.database().ref('users/'+userID+'/bets/0/positionTable/'+group)
    .orderByChild('order').once('value').then((snapshot)=>{
      var positionTable = [];
      snapshot.forEach((childSnapshot)=>{
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();
        childData.key=childKey;
        positionTable.push(childData);
      });
      this.setState({
        positionTable: positionTable
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    var userID = nextProps.user.userID;
    var group = nextProps.group;
    var order = nextProps.order;
    firebase.database().ref('users/'+userID+'/bets/0/matches/')
    .orderByChild(order).equalTo(group).once('value').then((snapshot)=>{
      var matches = [];
      snapshot.forEach((childSnapshot)=>{
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();
        childData.key=childKey;
        matches.push(childData);
      });
      this.setState({
        matches: matches
      });
    });
    firebase.database().ref('users/'+userID+'/bets/0/positionTable/'+group)
    .orderByChild('order').once('value').then((snapshot)=>{
      var positionTable = [];
      snapshot.forEach((childSnapshot)=>{
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();
        childData.key=childKey;
        positionTable.push(childData);
      });
      this.setState({
        positionTable: positionTable
      });
    });
  }

  render() {
    var matchesComponent=this.state.matches.map((item, key) => (
      <Match key={item.id} data={item} status={this.state.status} onScore={this.onScore}/>
    ));
    var positionTableComponent=this.state.positionTable.map((item, key) => (
      <PositionTableTeam key={key} team={item.key} name={item.key} 
      mp={item.played} gf={item.goalsFor} 
      ga={item.goalsAgainst} pt={item.points} />
    ));
    var navigateGroups=this.props.navigateGroups;
    var positionLeft=this.props.position-1;
    var positionRight=this.props.position+1;
    var buttonLeft=navigateGroups[positionLeft]===undefined?
    (<Button><Text></Text></Button>):
    (<Button onPress={()=> this.onPressButton(positionLeft, navigateGroups[positionLeft].group, 
      navigateGroups[positionLeft].groupName, navigateGroups[positionLeft].order)}>
      <Text>{navigateGroups[positionLeft].groupName}</Text>
    </Button>);
    var buttonRight=navigateGroups[positionRight]===undefined?
    (<Button><Text></Text></Button>):
    (<Button onPress={()=> this.onPressButton(positionRight, navigateGroups[positionRight].group, 
      navigateGroups[positionRight].groupName, navigateGroups[positionRight].order)}>
      <Text>{navigateGroups[positionRight].groupName}</Text>
    </Button>);
    return (
      <Container>
        <HeaderPolla pop={true} name={this.props.groupName} />
        <Tabs>
          <Tab heading={ <TabHeading><Icon name="md-calendar" /></TabHeading>}>
            <Content padder>
              <Card>
                {matchesComponent}
              </Card>
            </Content>
          </Tab>
          {this.props.order==='group' &&
            <Tab heading={ <TabHeading><Icon name="md-grid" size={27} color="#fff" /></TabHeading>}>
              <Content padder>
                <Card>
                  <CardItem bordered>
                    <Left>
                      <Body>
                        <Text>Equipos</Text>
                      </Body>
                    </Left>
                    <Right>
                      <Grid>
                        <Col style={{ alignItems: 'flex-end', justifyContent: 'center'}}>
                          <Text>MP</Text>
                        </Col>
                        <Col style={{ alignItems: 'flex-end', justifyContent: 'center'}}>
                          <Text>GF</Text>
                        </Col>
                        <Col style={{ alignItems: 'flex-end', justifyContent: 'center'}}>
                          <Text>GA</Text>
                        </Col>
                        <Col style={{ alignItems: 'flex-end', justifyContent: 'center'}}>
                          <Text>PT</Text>
                        </Col>
                      </Grid>
                    </Right>
                  </CardItem>
                  {positionTableComponent}
                </Card>
              </Content>
            </Tab>
          }
        </Tabs>
        <Footer>
          <FooterTab>
            {buttonLeft}
            {buttonRight}
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}
import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Container, Tabs, Tab, TabHeading, Icon, Content, Card, Text, Button, Footer, FooterTab } from 'native-base';
import HeaderPolla from './../components/HeaderPolla';
import Match from './../components/Match';
import PositionTableTeam from './../components/PositionTableTeam';
import firebase from 'react-native-firebase';

export default class PhaseScene extends Component {

  constructor(props) {
    super(props);
    this.onPressRanking = this.onPressRanking.bind(this);
    this.onScore = this.onScore.bind(this);
    this.state = {
      status: this.props.status,
      matches: [],
      positionTable: []
    };
  }

  onPressRanking(){
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
    firebase.database().ref('users/'+userID+'/bets/0/matches/')
    .orderByChild('group').equalTo(group).once('value').then((snapshot)=>{
      var matches = [];
      snapshot.forEach((childSnapshot)=>{
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();
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
      <Match key={key} data={item} status={this.state.status} onScore={this.onScore}/>
    ));
    var positionTableComponent=this.state.positionTable.map((item, key) => (
      <PositionTableTeam key={key} team={item.key} name={item.key} 
      mp={item.played} gf={item.goalsFor} 
      ga={item.goalsAgainst} pt={item.points} />
    ));
    return (
      <Container>
        <HeaderPolla pop={true} name={'Grupo '+ this.props.group} />
        <Tabs>
          <Tab heading={ <TabHeading><Icon name="md-calendar" /></TabHeading>}>
            <Content padder>
              <Card>
                {matchesComponent}
              </Card>
            </Content>
          </Tab>
          <Tab heading={ <TabHeading><Icon name="md-grid" size={27} color="#fff" /></TabHeading>}>
            <Content padder>
              <Card>
                {positionTableComponent}
              </Card>
            </Content>
          </Tab>
        </Tabs>
        <Footer>
          <FooterTab>
            <Button>
              <Text></Text>
            </Button>
            <Button>
              <Text>Grupo B</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}
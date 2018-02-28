import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Content, Card, CardItem, Text, Button } from 'native-base';
import Match from './../components/Match';
import firebase from 'react-native-firebase';

export default class FixtureScene extends Component {

  constructor() {
    super();
    this.state = {
      matches : [],
      groups : [],
      scores : []
    };
    this.onScore = this.onScore.bind(this);
    this.onPressRanking = this.onPressRanking.bind(this);
  }

  onPressRanking(){
    var scores=this.state.scores;
    firebase.database().ref('users/').set({
      scores: scores
    });
    Actions.ranking();
  }

  onScore(id, team, score){
    var scores=this.state.scores;
    var match=this.state.matches[id];
    if(scores[id]==null){
      scores[id]={group: match.group, id: match.id, 
        team1: match.team1, team2: match.team2, 
        scoreTeam1: '', scoreTeam2: ''}
    }
    if(team=='1'){
        scores[id].scoreTeam1 = score;
    }else{
      scores[id].scoreTeam2 = score;
    }
    this.setState({
      scores: scores
    });
  }

  componentDidMount() {
    firebase.database().ref('match/').once('value').then((snapshot)=>{
      var matches=[];
      var groups=[];
      var group={};
      snapshot.forEach(function(childSnapshot) {
        var item = childSnapshot.val();
        item.key = childSnapshot.key;
        if(childSnapshot.val().group!=group.id){
          group={id: childSnapshot.val().group, matches: []}
          groups.push(group);
        }
        group.matches.push(item);
        matches[childSnapshot.key] = childSnapshot.val();
      });
      this.setState({
        groups: groups,
        matches: matches
      });
    });
  }

  render() {
    var items=this.state.groups.map((item, key) => (
      <Card key={key}>
        <CardItem bordered={true}>
          <Text>Grupo {item.id}</Text>
        </CardItem>
        {item.matches.map((item, key) => (
            <Match id={item.key} key={item.key} team1={item.team1} team2={item.team2} onScore={this.onScore}/>
        ))}
      </Card>
    ));
    return (
      <Container>
      	<Header />
        <Content padder>
          {items}
          <Button full onPress={this.onPressRanking}>
            <Text>Registrar</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
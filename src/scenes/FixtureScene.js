import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Content, Card, CardItem, Text, Button } from 'native-base';
import Match from './../components/Match';
import firebase from 'react-native-firebase';

export default class FixtureScene extends Component {

  constructor() {
    super();
    this.state = {
      groups : []
    };
  }

  onPressRanking(){
    Actions.ranking();
  }

  componentDidMount() {
    firebase.database().ref('match/').once('value').then((snapshot)=>{
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
      });
      this.setState({
        groups: groups
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
            <Match key={item.key} team1={item.team1} team2={item.team2}/>
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
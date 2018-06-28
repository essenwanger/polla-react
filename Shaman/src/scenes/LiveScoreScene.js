import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Container, Icon, Content, Card, CardItem, 
  Body, Text, Thumbnail, Header, Left, Button, Title, Right } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import LiveScoreMatch from '../components/LiveScoreMatch';
import firebase from 'react-native-firebase';

export default class LiveScoreScene extends Component {

  constructor(props) {
    super(props);
    this.state = {
      liveScore:[]
    };
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

  render() {
    var items=null;
    items=this.state.liveScore.map((item, key) => (
      <LiveScoreMatch key={key} data={item} />
    ));
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent>
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
    );
  }
}
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Content, Card, CardItem, Text, Body, Button, 
  Item, Input, Thumbnail, Left, Right } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Flag } from './Helpers';

export default class MatchStaticGroup extends Component {

  constructor(props) {
    super(props);
    this.teamFlag1 = Flag(this.props.data.team1);
    this.teamFlag2 = Flag(this.props.data.team2);
  }

  render() {
    var date=this.props.data.date.split('2018')[0];
    var hour=this.props.data.timeutc.split(':')[0];
    hour=parseInt(hour);
    hour=hour-5;
    var minute=this.props.data.timeutc.split(':')[1];
    var score1=null;
    var score2=null;
    var points=null;
    score1=(
      <Col size={10}>
        <Body style={{justifyContent: 'center'}}>
          <Text>{this.props.data.scoreTeam1}</Text>
          <Text>{this.props.data.scoreTeamReal1}</Text>
        </Body>
      </Col>
    );
    score2=(
      <Col style={{alignItems: 'flex-end'}} size={10}>
        <Body style={{justifyContent: 'center', alignItems: 'flex-end'}}>
          <Text>{this.props.data.scoreTeam2}</Text>
          <Text>{this.props.data.scoreTeamReal2}</Text>
        </Body>
      </Col>
    );
    points=(
      <Col style={{flexDirection: 'row'}} size={20}>
        <Body style={{justifyContent: 'center', alignItems: 'flex-end'}}>
          <Text>{this.props.data.points}</Text>
        </Body>
      </Col>
    );
    return (
      <Card>
      <CardItem>
        <Grid>
          <Row>
            <Col>
              <Body style={{ marginBottom: 10 , alignItems: 'center'}}>
                <Text note style={{ textAlign: 'center'}}>{date}/ {hour}:{minute} / {this.props.data.city}</Text>
              </Body>
            </Col>
          </Row>
          <Row>
            <Col style={{flexDirection: 'row'}} size={30}>
              <Thumbnail small source={this.teamFlag1} 
              style={{ borderColor: '#000000', borderWidth: 0.2}}/>
              <Body style={{justifyContent: 'flex-start', marginLeft: 10, marginTop: 10}}>
                <Text>{this.props.data.team1}</Text>
              </Body>
            </Col>
            {score1}
            {score2}
            <Col style={{flexDirection: 'row'}} size={30}>
              <Body style={{justifyContent: 'flex-start', alignItems: 'flex-end', marginRight: 10, marginTop: 10}}>
                <Text>{this.props.data.team2}</Text>
              </Body>
              <Thumbnail small source={this.teamFlag2} 
              style={{ borderColor: '#000000', borderWidth: 0.2}}/>
            </Col>
            {points}
          </Row>
        </Grid>
      </CardItem>
      </Card>
    );
  }
}
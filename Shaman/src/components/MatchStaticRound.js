import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Content, CardItem, Text, Body, Button, 
  Item, Input, Thumbnail, Left, Right } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Flag } from './Helpers';

export default class MatchStaticRound extends Component {

  constructor(props) {
    super(props);
    this.teamFlag1 = Flag(this.props.data.team1);
    this.teamFlag2 = Flag(this.props.data.team2);
    this.scorePenaltyTeam1 = '';
    if(!(this.props.data.scorePenaltyTeam1==='' || this.props.data.scorePenaltyTeam1===undefined)){
      this.scorePenaltyTeam1 = '('+this.props.data.scorePenaltyTeam1+')';
    }
    this.scorePenaltyTeam2 = '';
    if(!(this.props.data.scorePenaltyTeam2==='' || this.props.data.scorePenaltyTeam2===undefined)){
      this.scorePenaltyTeam2 = '('+this.props.data.scorePenaltyTeam2+')';
    }
  }

  render() {
    var score1=null;
    var score2=null;
    var points=null;
    score1=(
      <Col size={10}>
        <Body style={{justifyContent: 'center'}}>
          <Text>{this.props.data.scoreTeam1}</Text>
          <Text>{this.scorePenaltyTeam1}</Text>
        </Body>
      </Col>
    );
    score2=(
      <Col style={{alignItems: 'flex-end'}} size={10}>
        <Body style={{justifyContent: 'center', alignItems: 'flex-end'}}>
          <Text>{this.props.data.scoreTeam2}</Text>
          <Text>{this.scorePenaltyTeam2}</Text>
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
      <CardItem>
        <Grid>
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
        </Grid>
      </CardItem>
    );
  }
}
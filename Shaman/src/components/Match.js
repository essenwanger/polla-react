import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Content, CardItem, Text, Body, Button, 
  Item, Input, Thumbnail, Left, Right } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Flag } from './Helpers';

export default class Match extends Component {

  constructor(props) {
    super(props);
    this.teamFlag1 = Flag(this.props.data.team1);
    this.teamFlag2 = Flag(this.props.data.team2);
    this.onScore = this.onScore.bind(this);
    var penalty=false;
    if(this.props.data.group.length!==1){
      penalty=true;
    }
    this.state = { 
      status: this.props.status,
      scoreTeam1: this.props.data.scoreTeam1,
      scoreTeam2: this.props.data.scoreTeam2,
      scorePenaltyTeam1: this.props.data.scorePenaltyTeam1,
      scorePenaltyTeam2: this.props.data.scorePenaltyTeam2,
      penalty: penalty
    };
  }

  onScore(text, typeScore){
    switch (typeScore) {
    case '1':
      let scoreTeam1 = text;
      this.setState({
        scoreTeam1
      });
      break;
    case '2':
      let scoreTeam2 = text;
      this.setState({
        scoreTeam2
      });
      break;
    case '1P':
      let scorePenaltyTeam1 = text;
      this.setState({
        scorePenaltyTeam1
      });
      break;
    case '2P':
      let scorePenaltyTeam2 = text;
      this.setState({
        scorePenaltyTeam2
      });
      break;
    }
    this.props.onScore(this.props.data.key,typeScore,text);
  }

  render() {
    var score1=null;
    var score2=null;
    var points=null;
    if(this.state.status==='opened'){
      score1=(
        <Col size={20}>
          <Item regular style={{ width: 45, height: 40 }}>
            <Input keyboardType={'numeric'} maxLength={2} 
            onChangeText={(text) => this.onScore(text,'1')} value={this.state.scoreTeam1} />
          </Item>
          {this.state.penalty &&
            <Item regular style={{ width: 45, height: 40 }}>
              <Input keyboardType={'numeric'} maxLength={2} 
              onChangeText={(text) => this.onScore(text,'1P')} value={this.state.scorePenaltyTeam1} />
            </Item>
          }
        </Col>
      );
      score2=(
        <Col style={{alignItems: 'flex-end'}} size={20}>
          <Item regular style={{ width: 45, height: 40 }}>
            <Input keyboardType={'numeric'} maxLength={2} 
            onChangeText={(text) => this.onScore(text,'2')} value={this.state.scoreTeam2} />
          </Item>
          {this.state.penalty &&
            <Item regular style={{ width: 45, height: 40 }}>
              <Input keyboardType={'numeric'} maxLength={2} 
                onChangeText={(text) => this.onScore(text,'2P')} value={this.state.scorePenaltyTeam2}/>
            </Item>
          }
        </Col>
      );
    }else{
      score1=(
        <Col size={10}>
          <Body style={{justifyContent: 'center'}}>
            <Text>{this.state.scoreTeam1}</Text>
            <Text>{this.props.data.scoreTeamReal1}</Text>
          </Body>
        </Col>
      );
      score2=(
        <Col style={{alignItems: 'flex-end'}} size={10}>
          <Body style={{justifyContent: 'center', alignItems: 'flex-end'}}>
            <Text>{this.state.scoreTeam2}</Text>
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
    }
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
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
    this.onChangeScore = this.onChangeScore.bind(this);
    let penalty=false;
    if(this.props.data.group.length!==1 && 
      this.props.data.scoreTeam1!=='' && 
      this.props.data.scoreTeam2!=='' &&
      this.props.data.scoreTeam1===this.props.data.scoreTeam2){
      penalty=true;
    }
    this.state = { 
      scoreTeam1: this.props.data.scoreTeam1,
      scoreTeam2: this.props.data.scoreTeam2,
      scorePenaltyTeam1: this.props.data.scorePenaltyTeam1,
      scorePenaltyTeam2: this.props.data.scorePenaltyTeam2,
      penalty: penalty
    };
  }

  onChangeScore(text, typeScore){
    switch (typeScore) {
    case '1':
      let scoreTeam1 = text;
      this.setState({
        scoreTeam1
      });
      if(this.props.data.group.length!==1 && 
        scoreTeam1!=='' && 
        this.state.scoreTeam2!=='' &&
        scoreTeam1===this.state.scoreTeam2){
        this.setState({
          penalty: true
        });
      }else{
        this.setState({
          scorePenaltyTeam1: '',
          scorePenaltyTeam2: '',
          penalty: false
        });
        this.props.onChangeScore(this.props.data.key, '1P', '');
        this.props.onChangeScore(this.props.data.key, '2P', '');
      }
      break;
    case '2':
      let scoreTeam2 = text;
      this.setState({
        scoreTeam2
      });
      if(this.props.data.group.length!==1 && 
        this.state.scoreTeam1!=='' && 
        scoreTeam2!=='' &&
        this.state.scoreTeam1===scoreTeam2){
        this.setState({
          penalty: true
        });
      }else{
        this.setState({
          scorePenaltyTeam1: '',
          scorePenaltyTeam2: '',
          penalty: false
        });
        this.props.onChangeScore(this.props.data.key, '1P', '');
        this.props.onChangeScore(this.props.data.key, '2P', '');
      }
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
    this.props.onChangeScore(this.props.data.key, typeScore, text);
  }

  render() {
    var score1=null;
    var score2=null;
    var points=null;
    score1=(
      <Col size={20}>
        <Item regular style={{ width: 45, height: 40 }}>
          <Input keyboardType={'numeric'} maxLength={2} textAlign={'center'}
          onChangeText={(text) => this.onChangeScore(text,'1')} value={this.state.scoreTeam1} />
        </Item>
        {this.state.penalty &&
          <Item regular style={{ width: 45, height: 40 }}>
            <Input keyboardType={'numeric'} maxLength={2} 
            onChangeText={(text) => this.onChangeScore(text,'1P')} value={this.state.scorePenaltyTeam1} />
          </Item>
        }
      </Col>
    );
    score2=(
      <Col style={{alignItems: 'flex-end'}} size={20}>
        <Item regular style={{ width: 45, height: 40 }}>
          <Input keyboardType={'numeric'} maxLength={2} textAlign={'center'}
          onChangeText={(text) => this.onChangeScore(text,'2')} value={this.state.scoreTeam2} />
        </Item>
        {this.state.penalty &&
          <Item regular style={{ width: 45, height: 40 }}>
            <Input keyboardType={'numeric'} maxLength={2} 
              onChangeText={(text) => this.onChangeScore(text,'2P')} value={this.state.scorePenaltyTeam2}/>
          </Item>
        }
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
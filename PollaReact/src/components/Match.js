import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Content, CardItem, Text, Body, Button, 
  Item, Input, Thumbnail } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

export default class Match extends Component {

  constructor(props) {
    super(props);
    this.teamFlag1 = 'http://img.fifa.com/images/flags/4/'+this.props.teamFlag1;
    this.teamFlag2 = 'http://img.fifa.com/images/flags/4/'+this.props.teamFlag2;
    this.score1 = this.score1.bind(this);
    this.score2 = this.score2.bind(this);
  }

  score1(text){
    this.props.onScore(this.props.id,'1',text);
  }

  score2(text){
    this.props.onScore(this.props.id,'2',text);
  }

  render() {
    return (
      <CardItem>
        <Grid>
          <Col>
            <Thumbnail small source={{uri: this.teamFlag1}} 
            style={{ borderColor: '#000000', borderWidth: 0.2}}/>   
          </Col>
          <Col>
            <Item regular style={{ width: 60, height: 40 }}>
              <Input keyboardType={'numeric'} maxLength={2} 
              onChangeText={(text) => this.score1(text)} />
            </Item>
          </Col>
          <Col style={{alignItems: 'flex-end'}}>
            <Item regular style={{ width: 60, height: 40 }}>
              <Input keyboardType={'numeric'} maxLength={2} 
              onChangeText={(text) => this.score2(text)} />
            </Item>
          </Col>
          <Col style={{alignItems: 'flex-end'}}>
            <Thumbnail small source={{uri: this.teamFlag2}} 
            style={{ borderColor: '#000000', borderWidth: 0.2}}/>
          </Col>
        </Grid>
      </CardItem>
    );
  }
}
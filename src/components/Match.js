import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Content, CardItem, Text, Body, Button, 
  Item, Input, Thumbnail } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

export default class Match extends Component {

  constructor(props) {
    super(props);
    this.team1 = 'http://www.countryflags.io/'+this.props.team1+'/flat/64.png';
    this.team2 = 'http://www.countryflags.io/'+this.props.team2+'/flat/64.png';
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
            <Thumbnail square small source={{uri: this.team1}} />   
          </Col>
          <Col>
            <Item regular style={{ width: 60, height: 40 }}>
              <Input keyboardType={'numeric'} maxLength={2} 
              onChangeText={(text) => this.score1(text)} />
            </Item>
          </Col>
          <Col style={{alignItems: 'flex-end'}}>
            <Item regular style={{ width: 60, height: 40  }}>
              <Input keyboardType={'numeric'} maxLength={2} 
              onChangeText={(text) => this.score2(text)} />
            </Item>
          </Col>
          <Col style={{alignItems: 'flex-end'}}>
            <Thumbnail square small source={{uri: this.team2}} />
          </Col>
        </Grid>
      </CardItem>
    );
  }
}
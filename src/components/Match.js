import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Content, Card, CardItem, Text, Body, Button, 
  Item, Input, Left, Right, Thumbnail } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

export default class Match extends Component {

  constructor(props) {
    super(props);
    //this.state = {};
    this.team1 = 'http://www.countryflags.io/'+this.props.team1+'/flat/64.png';
    this.team2 = 'http://www.countryflags.io/'+this.props.team2+'/flat/64.png';
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
              <Input/>
            </Item>
          </Col>
          <Col style={{alignItems: 'flex-end'}}>
            <Item regular style={{ width: 60, height: 40  }}>
              <Input/>
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
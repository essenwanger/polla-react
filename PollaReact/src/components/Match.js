import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Content, CardItem, Text, Body, Button, 
  Item, Input, Thumbnail } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

export default class Match extends Component {

  constructor(props) {
    super(props);
    switch (this.props.team1) {
      case 'RUS':
          this.teamFlag1 = require('../img/flags/rus.png');
          break;
      case 'KSA':
          this.teamFlag1 = require('../img/flags/ksa.png');
          break;
      case 'EGY':
          this.teamFlag1 = require('../img/flags/egy.png');
          break;
      case 'URU':
          this.teamFlag1 = require('../img/flags/uru.png');
          break;
      case 'POR':
          this.teamFlag1 = require('../img/flags/por.png');
          break;
      case 'ESP':
          this.teamFlag1 = require('../img/flags/esp.png');
          break;
      case 'MAR':
          this.teamFlag1 = require('../img/flags/mar.png');
          break;
      case 'IRN':
          this.teamFlag1 = require('../img/flags/irn.png');
          break;
      case 'FRA':
          this.teamFlag1 = require('../img/flags/fra.png');
          break;
      case 'AUS':
          this.teamFlag1 = require('../img/flags/aus.png');
          break;
      case 'PER':
          this.teamFlag1 = require('../img/flags/per.png');
          break;
      case 'DEN':
          this.teamFlag1 = require('../img/flags/den.png');
          break;
      case 'ARG':
          this.teamFlag1 = require('../img/flags/arg.png');
          break;
      case 'ISL':
          this.teamFlag1 = require('../img/flags/isl.png');
          break;
      case 'CRO':
          this.teamFlag1 = require('../img/flags/cro.png');
          break;
      case 'NGA':
          this.teamFlag1 = require('../img/flags/nga.png');
          break;
      case 'CRC':
          this.teamFlag1 = require('../img/flags/crc.png');
          break;
      case 'SRB':
          this.teamFlag1 = require('../img/flags/srb.png');
          break;
      case 'BRA':
          this.teamFlag1 = require('../img/flags/bra.png');
          break;
      case 'SUI':
          this.teamFlag1 = require('../img/flags/sui.png');
          break;
      case 'GER':
          this.teamFlag1 = require('../img/flags/ger.png');
          break;
      case 'MEX':
          this.teamFlag1 = require('../img/flags/mex.png');
          break;
      case 'SWE':
          this.teamFlag1 = require('../img/flags/swe.png');
          break;
      case 'KOR':
          this.teamFlag1 = require('../img/flags/kor.png');
          break;
      case 'BEL':
          this.teamFlag1 = require('../img/flags/bel.png');
          break;
      case 'PAN':
          this.teamFlag1 = require('../img/flags/pan.png');
          break;
      case 'TUN':
          this.teamFlag1 = require('../img/flags/tun.png');
          break;
      case 'ENG':
          this.teamFlag1 = require('../img/flags/eng.png');
          break;
      case 'POL':
          this.teamFlag1 = require('../img/flags/pol.png');
          break;
      case 'SEN':
          this.teamFlag1 = require('../img/flags/sen.png');
          break;
      case 'COL':
          this.teamFlag1 = require('../img/flags/col.png');
          break;
      case 'JPN':
          this.teamFlag1 = require('../img/flags/jpn.png');
          break;
    }

    switch (this.props.team2) {
      case 'RUS':
          this.teamFlag2 = require('../img/flags/rus.png');
          break;
      case 'KSA':
          this.teamFlag2 = require('../img/flags/ksa.png');
          break;
      case 'EGY':
          this.teamFlag2 = require('../img/flags/egy.png');
          break;
      case 'URU':
          this.teamFlag2 = require('../img/flags/uru.png');
          break;
      case 'POR':
          this.teamFlag2 = require('../img/flags/por.png');
          break;
      case 'ESP':
          this.teamFlag2 = require('../img/flags/esp.png');
          break;
      case 'MAR':
          this.teamFlag2 = require('../img/flags/mar.png');
          break;
      case 'IRN':
          this.teamFlag2 = require('../img/flags/irn.png');
          break;
      case 'FRA':
          this.teamFlag2 = require('../img/flags/fra.png');
          break;
      case 'AUS':
          this.teamFlag2 = require('../img/flags/aus.png');
          break;
      case 'PER':
          this.teamFlag2 = require('../img/flags/per.png');
          break;
      case 'DEN':
          this.teamFlag2 = require('../img/flags/den.png');
          break;
      case 'ARG':
          this.teamFlag2 = require('../img/flags/arg.png');
          break;
      case 'ISL':
          this.teamFlag2 = require('../img/flags/isl.png');
          break;
      case 'CRO':
          this.teamFlag2 = require('../img/flags/cro.png');
          break;
      case 'NGA':
          this.teamFlag2 = require('../img/flags/nga.png');
          break;
      case 'CRC':
          this.teamFlag2 = require('../img/flags/crc.png');
          break;
      case 'SRB':
          this.teamFlag2 = require('../img/flags/srb.png');
          break;
      case 'BRA':
          this.teamFlag2 = require('../img/flags/bra.png');
          break;
      case 'SUI':
          this.teamFlag2 = require('../img/flags/sui.png');
          break;
      case 'GER':
          this.teamFlag2 = require('../img/flags/ger.png');
          break;
      case 'MEX':
          this.teamFlag2 = require('../img/flags/mex.png');
          break;
      case 'SWE':
          this.teamFlag2 = require('../img/flags/swe.png');
          break;
      case 'KOR':
          this.teamFlag2 = require('../img/flags/kor.png');
          break;
      case 'BEL':
          this.teamFlag2 = require('../img/flags/bel.png');
          break;
      case 'PAN':
          this.teamFlag2 = require('../img/flags/pan.png');
          break;
      case 'TUN':
          this.teamFlag2 = require('../img/flags/tun.png');
          break;
      case 'ENG':
          this.teamFlag2 = require('../img/flags/eng.png');
          break;
      case 'POL':
          this.teamFlag2 = require('../img/flags/pol.png');
          break;
      case 'SEN':
          this.teamFlag2 = require('../img/flags/sen.png');
          break;
      case 'COL':
          this.teamFlag2 = require('../img/flags/col.png');
          break;
      case 'JPN':
          this.teamFlag2 = require('../img/flags/jpn.png');
          break;
    }

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
            <Thumbnail small source={this.teamFlag1} 
            style={{ borderColor: '#000000', borderWidth: 0.2}}/>   
          </Col>
          <Col>
            <Item regular style={{ width: 45, height: 40 }}>
              <Input keyboardType={'numeric'} maxLength={2} 
              onChangeText={(text) => this.score1(text)} />
            </Item>
          </Col>
          <Col style={{alignItems: 'flex-end'}}>
            <Item regular style={{ width: 45, height: 40 }}>
              <Input keyboardType={'numeric'} maxLength={2} 
              onChangeText={(text) => this.score2(text)} />
            </Item>
          </Col>
          <Col style={{alignItems: 'flex-end'}}>
            <Thumbnail small source={this.teamFlag2} 
            style={{ borderColor: '#000000', borderWidth: 0.2}}/>
          </Col>
        </Grid>
      </CardItem>
    );
  }
}
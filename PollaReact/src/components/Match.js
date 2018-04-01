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
      case 'RU':
          this.teamFlag1 = require('../img/flags/rus.png');
          break;
      case 'SA':
          this.teamFlag1 = require('../img/flags/ksa.png');
          break;
      case 'EG':
          this.teamFlag1 = require('../img/flags/egy.png');
          break;
      case 'UY':
          this.teamFlag1 = require('../img/flags/uru.png');
          break;
      case 'PT':
          this.teamFlag1 = require('../img/flags/por.png');
          break;
      case 'ES':
          this.teamFlag1 = require('../img/flags/esp.png');
          break;
      case 'MA':
          this.teamFlag1 = require('../img/flags/mar.png');
          break;
      case 'IR':
          this.teamFlag1 = require('../img/flags/irn.png');
          break;
      case 'FR':
          this.teamFlag1 = require('../img/flags/fra.png');
          break;
      case 'AU':
          this.teamFlag1 = require('../img/flags/aus.png');
          break;
      case 'PE':
          this.teamFlag1 = require('../img/flags/per.png');
          break;
      case 'DK':
          this.teamFlag1 = require('../img/flags/den.png');
          break;
      case 'AR':
          this.teamFlag1 = require('../img/flags/arg.png');
          break;
      case 'IS':
          this.teamFlag1 = require('../img/flags/isl.png');
          break;
      case 'HR':
          this.teamFlag1 = require('../img/flags/cro.png');
          break;
      case 'NG':
          this.teamFlag1 = require('../img/flags/nga.png');
          break;
      case 'CR':
          this.teamFlag1 = require('../img/flags/crc.png');
          break;
      case 'RS':
          this.teamFlag1 = require('../img/flags/srb.png');
          break;
      case 'BR':
          this.teamFlag1 = require('../img/flags/bra.png');
          break;
      case 'CH':
          this.teamFlag1 = require('../img/flags/sui.png');
          break;
      case 'DE':
          this.teamFlag1 = require('../img/flags/ger.png');
          break;
      case 'MX':
          this.teamFlag1 = require('../img/flags/mex.png');
          break;
      case 'SE':
          this.teamFlag1 = require('../img/flags/swe.png');
          break;
      case 'KR':
          this.teamFlag1 = require('../img/flags/kor.png');
          break;
      case 'BE':
          this.teamFlag1 = require('../img/flags/bel.png');
          break;
      case 'PA':
          this.teamFlag1 = require('../img/flags/pan.png');
          break;
      case 'TN':
          this.teamFlag1 = require('../img/flags/tun.png');
          break;
      case 'EN':
          this.teamFlag1 = require('../img/flags/eng.png');
          break;
      case 'PL':
          this.teamFlag1 = require('../img/flags/pol.png');
          break;
      case 'SN':
          this.teamFlag1 = require('../img/flags/sen.png');
          break;
      case 'CO':
          this.teamFlag1 = require('../img/flags/col.png');
          break;
      case 'JP':
          this.teamFlag1 = require('../img/flags/jpn.png');
          break;
    }

    switch (this.props.team2) {
      case 'RU':
          this.teamFlag2 = require('../img/flags/rus.png');
          break;
      case 'SA':
          this.teamFlag2 = require('../img/flags/ksa.png');
          break;
      case 'EG':
          this.teamFlag2 = require('../img/flags/egy.png');
          break;
      case 'UY':
          this.teamFlag2 = require('../img/flags/uru.png');
          break;
      case 'PT':
          this.teamFlag2 = require('../img/flags/por.png');
          break;
      case 'ES':
          this.teamFlag2 = require('../img/flags/esp.png');
          break;
      case 'MA':
          this.teamFlag2 = require('../img/flags/mar.png');
          break;
      case 'IR':
          this.teamFlag2 = require('../img/flags/irn.png');
          break;
      case 'FR':
          this.teamFlag2 = require('../img/flags/fra.png');
          break;
      case 'AU':
          this.teamFlag2 = require('../img/flags/aus.png');
          break;
      case 'PE':
          this.teamFlag2 = require('../img/flags/per.png');
          break;
      case 'DK':
          this.teamFlag2 = require('../img/flags/den.png');
          break;
      case 'AR':
          this.teamFlag2 = require('../img/flags/arg.png');
          break;
      case 'IS':
          this.teamFlag2 = require('../img/flags/isl.png');
          break;
      case 'HR':
          this.teamFlag2 = require('../img/flags/cro.png');
          break;
      case 'NG':
          this.teamFlag2 = require('../img/flags/nga.png');
          break;
      case 'CR':
          this.teamFlag2 = require('../img/flags/crc.png');
          break;
      case 'RS':
          this.teamFlag2 = require('../img/flags/srb.png');
          break;
      case 'BR':
          this.teamFlag2 = require('../img/flags/bra.png');
          break;
      case 'CH':
          this.teamFlag2 = require('../img/flags/sui.png');
          break;
      case 'DE':
          this.teamFlag2 = require('../img/flags/ger.png');
          break;
      case 'MX':
          this.teamFlag2 = require('../img/flags/mex.png');
          break;
      case 'SE':
          this.teamFlag2 = require('../img/flags/swe.png');
          break;
      case 'KR':
          this.teamFlag2 = require('../img/flags/kor.png');
          break;
      case 'BE':
          this.teamFlag2 = require('../img/flags/bel.png');
          break;
      case 'PA':
          this.teamFlag2 = require('../img/flags/pan.png');
          break;
      case 'TN':
          this.teamFlag2 = require('../img/flags/tun.png');
          break;
      case 'EN':
          this.teamFlag2 = require('../img/flags/eng.png');
          break;
      case 'PL':
          this.teamFlag2 = require('../img/flags/pol.png');
          break;
      case 'SN':
          this.teamFlag2 = require('../img/flags/sen.png');
          break;
      case 'CO':
          this.teamFlag2 = require('../img/flags/col.png');
          break;
      case 'JP':
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
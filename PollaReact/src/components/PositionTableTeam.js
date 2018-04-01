import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { CardItem, Body, Text, Right, Left, Thumbnail,  } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

export default class PositionTableTeam extends Component {

  constructor(props) {
    super(props);
    switch (this.props.team) {
      case 'RU':
          this.flag = require('../img/flags/rus.png');
          break;
      case 'SA':
          this.flag = require('../img/flags/ksa.png');
          break;
      case 'EG':
          this.flag = require('../img/flags/egy.png');
          break;
      case 'UY':
          this.flag = require('../img/flags/uru.png');
          break;
      case 'PT':
          this.flag = require('../img/flags/por.png');
          break;
      case 'ES':
          this.flag = require('../img/flags/esp.png');
          break;
      case 'MA':
          this.flag = require('../img/flags/mar.png');
          break;
      case 'IR':
          this.flag = require('../img/flags/irn.png');
          break;
      case 'FR':
          this.flag = require('../img/flags/fra.png');
          break;
      case 'AU':
          this.flag = require('../img/flags/aus.png');
          break;
      case 'PE':
          this.flag = require('../img/flags/per.png');
          break;
      case 'DK':
          this.flag = require('../img/flags/den.png');
          break;
      case 'AR':
          this.flag = require('../img/flags/arg.png');
          break;
      case 'IS':
          this.flag = require('../img/flags/isl.png');
          break;
      case 'HR':
          this.flag = require('../img/flags/cro.png');
          break;
      case 'NG':
          this.flag = require('../img/flags/nga.png');
          break;
      case 'CR':
          this.flag = require('../img/flags/crc.png');
          break;
      case 'RS':
          this.flag = require('../img/flags/srb.png');
          break;
      case 'BR':
          this.flag = require('../img/flags/bra.png');
          break;
      case 'CH':
          this.flag = require('../img/flags/sui.png');
          break;
      case 'DE':
          this.flag = require('../img/flags/ger.png');
          break;
      case 'MX':
          this.flag = require('../img/flags/mex.png');
          break;
      case 'SE':
          this.flag = require('../img/flags/swe.png');
          break;
      case 'KR':
          this.flag = require('../img/flags/kor.png');
          break;
      case 'BE':
          this.flag = require('../img/flags/bel.png');
          break;
      case 'PA':
          this.flag = require('../img/flags/pan.png');
          break;
      case 'TN':
          this.flag = require('../img/flags/tun.png');
          break;
      case 'EN':
          this.flag = require('../img/flags/eng.png');
          break;
      case 'PL':
          this.flag = require('../img/flags/pol.png');
          break;
      case 'SN':
          this.flag = require('../img/flags/sen.png');
          break;
      case 'CO':
          this.flag = require('../img/flags/col.png');
          break;
      case 'JP':
          this.flag = require('../img/flags/jpn.png');
          break;
    }
  }

  render() {
    return (
       <CardItem>
          <Left>
            <Thumbnail small source={this.flag} 
              style={{ borderColor: '#000000', borderWidth: 0.2}}/>
            <Body>
              <Text>{this.props.name}</Text>
            </Body>
          </Left>
          <Right>
            <Grid>
              <Col style={{ alignItems: 'flex-end', justifyContent: 'center'}}>
                <Text>
                {this.props.mp}
                </Text>
              </Col>
              <Col style={{ alignItems: 'flex-end', justifyContent: 'center'}}>
                <Text>
                {this.props.gf}
                </Text>
              </Col>
              <Col style={{ alignItems: 'flex-end', justifyContent: 'center'}}>
                <Text>
                {this.props.ga}
                </Text>
              </Col>
              <Col style={{ alignItems: 'flex-end', justifyContent: 'center'}}>
                <Text>
                {this.props.pt}
                </Text>
              </Col>
            </Grid>
          </Right>
        </CardItem>
    );
  }
}
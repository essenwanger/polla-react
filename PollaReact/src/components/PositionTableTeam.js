import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { CardItem, Body, Text, Right, Left, Thumbnail,  } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

export default class PositionTableTeam extends Component {

  constructor(props) {
    super(props);
    switch (this.props.team) {
      case 'RUS':
          this.flag = require('../img/flags/rus.png');
          break;
      case 'KSA':
          this.flag = require('../img/flags/ksa.png');
          break;
      case 'EGY':
          this.flag = require('../img/flags/egy.png');
          break;
      case 'URU':
          this.flag = require('../img/flags/uru.png');
          break;
      case 'POR':
          this.flag = require('../img/flags/por.png');
          break;
      case 'ESP':
          this.flag = require('../img/flags/esp.png');
          break;
      case 'MAR':
          this.flag = require('../img/flags/mar.png');
          break;
      case 'IRN':
          this.flag = require('../img/flags/irn.png');
          break;
      case 'FRA':
          this.flag = require('../img/flags/fra.png');
          break;
      case 'AUS':
          this.flag = require('../img/flags/aus.png');
          break;
      case 'PER':
          this.flag = require('../img/flags/per.png');
          break;
      case 'DEN':
          this.flag = require('../img/flags/den.png');
          break;
      case 'ARG':
          this.flag = require('../img/flags/arg.png');
          break;
      case 'ISL':
          this.flag = require('../img/flags/isl.png');
          break;
      case 'CRO':
          this.flag = require('../img/flags/cro.png');
          break;
      case 'NGA':
          this.flag = require('../img/flags/nga.png');
          break;
      case 'CRC':
          this.flag = require('../img/flags/crc.png');
          break;
      case 'SRB':
          this.flag = require('../img/flags/srb.png');
          break;
      case 'BRA':
          this.flag = require('../img/flags/bra.png');
          break;
      case 'SUI':
          this.flag = require('../img/flags/sui.png');
          break;
      case 'GER':
          this.flag = require('../img/flags/ger.png');
          break;
      case 'MEX':
          this.flag = require('../img/flags/mex.png');
          break;
      case 'SWE':
          this.flag = require('../img/flags/swe.png');
          break;
      case 'KOR':
          this.flag = require('../img/flags/kor.png');
          break;
      case 'BEL':
          this.flag = require('../img/flags/bel.png');
          break;
      case 'PAN':
          this.flag = require('../img/flags/pan.png');
          break;
      case 'TUN':
          this.flag = require('../img/flags/tun.png');
          break;
      case 'ENG':
          this.flag = require('../img/flags/eng.png');
          break;
      case 'POL':
          this.flag = require('../img/flags/pol.png');
          break;
      case 'SEN':
          this.flag = require('../img/flags/sen.png');
          break;
      case 'COL':
          this.flag = require('../img/flags/col.png');
          break;
      case 'JPN':
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
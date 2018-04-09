import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { CardItem, Body, Text, Right, Left, Thumbnail,  } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Flag } from './Helpers';

export default class PositionTableTeam extends Component {

  constructor(props) {
    super(props);
    this.flag = Flag(this.props.team);
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
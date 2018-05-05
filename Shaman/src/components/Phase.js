import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Card, CardItem, Body, Text, Right } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

export default class Phase extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Card>
        <CardItem button onPress={this.props.onPressPhase}>
          <Body>
            <Text>
               {this.props.name}
            </Text>
          </Body>
          <Right>
            <Text>
               {this.props.percentage}
            </Text>
          </Right>
        </CardItem>
      </Card>
    );
  }
}
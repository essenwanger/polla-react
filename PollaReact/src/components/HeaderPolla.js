import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Header, Left, Body, Title, Right, Button, Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';

export default class HeaderPolla extends Component {

  constructor(props) {
    super(props);
  }

  onPressBack() {
    Actions.pop({ refresh: { updateData: Math.random() } })
  }

  render() {
    let button = null;
    if (this.props.pop) {
      button = 
          <Button transparent onPress={this.onPressBack}>
            <Icon name='arrow-back' />
          </Button>;
    }
    return (
      <Header hasTabs>
        <Left>{button}</Left>
        <Body>
          <Title>{this.props.name}</Title>
        </Body>
        <Right/>
      </Header>
    );
  }
}
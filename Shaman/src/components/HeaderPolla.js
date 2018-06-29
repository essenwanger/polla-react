import React, { Component } from 'react';
import { StyleSheet, BackHandler } from 'react-native';
import { Header, Left, Body, Title, Right, Button, Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';

export default class HeaderPolla extends Component {

  constructor(props) {
    super(props);
    this.onBackPress = this.onBackPress.bind(this);
  }

  onPressBack() {
    Actions.pop();
    Actions.refresh({ updateData: Math.random() });
  }

  componentWillMount () {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  componentWillUnmount () {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  onBackPress () {
    var user=this.props.user;
    if (Actions.state.routes[Actions.state.index].routeName === 'phase') {
      Actions.reset('dashboard', {user: user});
      return true;
    }
    return false;
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
        <Body style={{flex: 3}}>
          <Title>{this.props.name}</Title>
        </Body>
        <Right/>
      </Header>
    );
  }
}
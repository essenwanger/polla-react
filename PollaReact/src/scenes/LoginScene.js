import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Container, Text, Button, View, Icon, H1 } from 'native-base';
import firebase from 'react-native-firebase';

export default class LoginScene extends Component {

  constructor() {
    super();
  }

  onPressLogin(){
    Actions.terms();
  }

  render() {
    return (
      <Container>
        <View>
          <Button iconLeft block danger onPress={this.onPressLogin}>
            <Icon name='logo-googleplus' />
            <Text>Login</Text>
          </Button>
        </View>
      </Container>
    );
  }
}
import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Container, Text, Button, View, Icon, H1 } from 'native-base';
import firebase from 'react-native-firebase';

export default class LoginScene extends Component {

  constructor() {
    super();
    this.state = {
      name: ''
    };
    this.onPress = this.onPress.bind(this);
  }

  onPress(){
    firebase.database().ref().once('value').then((snapshot)=>{
      this.setState({
        name: snapshot.val().name
      });
    });
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
          <Button block onPress={this.onPress}>
            <Text>Firebase</Text>
          </Button>
          <Text>{this.state.name}</Text>
        </View>
      </Container>
    );
  }
}
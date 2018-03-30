import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Container, Text, Button, View, Icon, H1 } from 'native-base';
import firebase from 'react-native-firebase';
import GoogleSignIn from 'react-native-google-sign-in';

export default class LoginScene extends Component {

  constructor() {
    super();
    this.state = {
      user: null
    };
    this.onPressLogin = this.onPressLogin.bind(this);
  }

  onPressLogin(){
    GoogleSignIn.signInPromise().then((user) => {
      console.log('signInPromise resolved', user);
      this.setState({user: user});
      Actions.terms();
    }, (e) => {
      console.log('signInPromise rejected', e);
    });
    //Actions.terms();
  }

  componentWillMount() {
    this._setupGoogleSignIn();
  }

  async _setupGoogleSignIn() {
    
    try {
      await GoogleSignIn.configure({
        clientID: '991338042977-7nqq3btnte4rolituui9uivhhoub6aqc.apps.googleusercontent.com'
      });
  
    } catch(err) {
      console.log("Play services error", err.code, err.message);
    }
  }

  render() {
    return (
      <Container>
        <View>
          <Button iconLeft block danger onPress={this.onPressLogin}>
            <Icon name='logo-googleplus' />
            <Text>Empezar</Text>
          </Button>
        </View>
      </Container>
    );
  }
}
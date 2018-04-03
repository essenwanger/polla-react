import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Container, Content, Header, Text, Button, View, Icon, H1, Spinner  } from 'native-base';
import firebase from 'react-native-firebase';
import GoogleSignIn from 'react-native-google-sign-in';

export default class LoginScene extends Component {

  constructor() {
    super();
    this.state = {
      user: null,
      check: false
    };
    this.onPressLogin = this.onPressLogin.bind(this);
  }

  onPressLogin(){
    GoogleSignIn.signInPromise().then((user) => {
      console.log('signInPromise resolved', user);
      this.setState({user: user});
      Actions.terms({user: user});
      this._saveUser(user);
    }, (e) => {
      console.log('signInPromise rejected', e);
    });
  }

  componentWillMount() {
    this._setupGoogleSignIn();
  }

  _saveUser(user){
    console.log("guardando usuario en firebase", user);
  }

  _setupGoogleSignIn() {
    
    try {
      GoogleSignIn.configure({
        clientID: '991338042977-7nqq3btnte4rolituui9uivhhoub6aqc.apps.googleusercontent.com'
      });
  
    } catch(err) {
      console.log("Play services error", err.code, err.message);
    }

    GoogleSignIn.signInSilentlyPromise().then((user) => {
      this.setState({user: user});
      this.setState({check: true});
      Actions.dashboard({user: this.state.user});
      this._saveUser(user);
    }, (e) => {
      console.log('signInSilentlyPromise rejected', e);
    });

  }

  render() {
    if(this.state.check && this.state.user  == null) {
      return (
        <Container>
          <Content>
            <Text>Logo del App</Text>
            <Button iconLeft block danger onPress={this.onPressLogin}>
              <Icon name='logo-googleplus' />
              <Text>Empezar a jugar</Text>
            </Button>
            <Text>Desarrollado por:</Text>
            <Text>Logo Bizantinos</Text>
          </Content>
        </Container>
      );
    }
    return (
      <Container>
        <Content>
          <Spinner text="Cargando..." color='blue' />
        </Content>
      </Container>
    );
  }
}
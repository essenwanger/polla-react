import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Container, Content, Header, Text, Button, View, Icon, H1, Spinner, Toast, Root } from 'native-base';
import firebase from 'react-native-firebase';
import GoogleSignIn from 'react-native-google-sign-in';
import { Alert, Platform } from 'react-native';

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
      var userLogin = this.parseUser(user);
      this.setState({user: userLogin});
      Actions.terms({user: userLogin});
    }, (e) => {
      console.log('signInPromise rejected', e);
    });
  }

  componentWillMount() {
    this._setupGoogleSignIn();
  }

  componentDidMount() {
    /*Toast.show({
              text: 'Error conexion',
              position: 'bottom',
              buttonText: 'Ok',
              type: 'danger'
            });*/
    /*Alert.alert(
      'Error conexion',
      'Preguntar a Miguel'
    );*/
  }

  parseUser(user){
    return {
      userID: user.userID,
      name: user.name,
      givenName: user.givenName,
      familyName: user.familyName,
      email: user.email,
      picture: Platform.OS === 'ios' ? user.photoUrl320 : user.photoUrlTiny
    };
  }

  _setupGoogleSignIn() {
    try {
      GoogleSignIn.configure({
        clientID: '991338042977-7nqq3btnte4rolituui9uivhhoub6aqc.apps.googleusercontent.com',
        serverClientID: '991338042977-oc4j8o5t8u46ups80kbbkrjome59o6rm.apps.googleusercontent.com'
      });
  
    } catch(err) {
      console.log("Play services error", err.code, err.message);
    }

    GoogleSignIn.signInSilentlyPromise().then((user) => {
      var userLogin = this.parseUser(user);
      this.setState({user: userLogin});
      this.setState({check: true});
      Actions.dashboard({user: this.state.user});
    }, (e) => {
      console.log('signInSilentlyPromise rejected', e);
      this.setState({check: true});
    });

  }

  render() {
    if(this.state.check && this.state.user  == null) {
      return (
        <Root>
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
        </Root>
      );
    }
    return (
      <Root>
      <Container>
        <Content>
          <Spinner text="Cargando..." color='blue' />
        </Content>
      </Container>
      </Root>
    );
  }
}
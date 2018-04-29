import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { View, ActivityIndicator, Image, Platform, Button, Text } from 'react-native';
import firebase from 'react-native-firebase';
import GoogleSignIn from 'react-native-google-sign-in';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class LoginScene extends Component {

  constructor() {
    super();
    this.state = {
      check: false
    };
    this.onPressLogin = this.onPressLogin.bind(this);
  }

  onPressLogin(){
    this.setState({check: false});
    GoogleSignIn.signInPromise().then((user) => {
      var userLogin = this.parseUser(user);
      firebase.database().ref('users/'+user.userID).once('value').then((snapshot)=>{
        this.setState({check: true});
        if(snapshot.val()===null){
          Actions.terms({user: userLogin});
        } else {
          Actions.reset('dashboard', {user: snapshot.val()});
        }
      });
    }, (e) => {
      console.log('signInPromise rejected', e);
      this.setState({check: true});
    });
  }

  componentDidMount() {
    this.setupGoogleSignIn();
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

  setupGoogleSignIn() {
    try {
      GoogleSignIn.configure({
        clientID: '991338042977-7nqq3btnte4rolituui9uivhhoub6aqc.apps.googleusercontent.com',
        serverClientID: '991338042977-oc4j8o5t8u46ups80kbbkrjome59o6rm.apps.googleusercontent.com'
      });
    } catch(err) {
      console.log("Play services error", err.code, err.message);
    }

    //Verificar que exista usuario en Firebase
    GoogleSignIn.signInSilentlyPromise().then((user) => {
      var userLogin = this.parseUser(user);
      firebase.database().ref('users/'+user.userID+'/').once('value').then((snapshot)=>{
        if(snapshot.val()===null){
          Actions.terms({user: userLogin});
          this.setState({check: true});
        } else {
          Actions.reset('dashboard', {user: snapshot.val()});
        }
      });
    }, (e) => {
      console.log('signInSilentlyPromise rejected', e);
      this.setState({check: true});
    });

  }

  render() {
    return (
      <View>
        <Image source={require('../img/background.png')} style={{ flex: 1, resizeMode: 'stretch'}} >
        
        </Image>
        { this.state.check ? 
          ( 
            <Button onPress={this.onPressLogin} title="Comenzar a jugar" color="#00AE33">
              <Icon style={{color:"#FFF"}} name='facebook' />
            </Button> 
          )
          :
          ( 
            <ActivityIndicator size="small" color="#FFF" />
          )
        }
      </View>
    );
  }
}
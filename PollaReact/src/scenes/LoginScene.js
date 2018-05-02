import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { View, Image, Platform, StyleSheet} from 'react-native';
import { Text, Title, Button, Icon, H1, Spinner, Toast} from 'native-base';
import firebase from 'react-native-firebase';
import GoogleSignIn from 'react-native-google-sign-in';

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
          var userSave = snapshot.val();
          var betKey = snapshot.child("bets/all/0/betKey").val();//Siempre muestra la primera apuesta de ALL
          Actions.reset('dashboard', {user: userSave, betKey: betKey});
        }
      });
    }, (e) => {
      Toast.show({
         text: 'No puede iniciar sesión con Google',
         position: 'bottom',
         buttonText: 'Ok',
         type: 'danger'
       });
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
      Toast.show({
        text: 'No se puede activar Google Services',
        position: 'bottom',
        buttonText: 'Ok',
        type: 'danger'
      });
    }

    //Verificar que exista usuario en Firebase
    GoogleSignIn.signInSilentlyPromise().then((user) => {
      var userLogin = this.parseUser(user);
      firebase.database().ref('users/'+user.userID+'/').once('value').then((snapshot)=>{
        if(snapshot.val()===null){
          Actions.terms({user: userLogin});
          this.setState({check: true});
        } else {
          var userSave = snapshot.val();
          var betKey = snapshot.child("bets/all/0/betKey").val();//Siempre muestra la primera apuesta de ALL
          Actions.reset('dashboard', {user: userSave, betKey: betKey});
        }
      });
    }, (e) => {
      this.setState({check: true});
    });

  }

  render() {
    return (
      <View style={styles.content} >
        <View style={styles.imageContent} >
          <Image
            style={styles.imageBackground}
            source={require('../img/background.png')}
          />
        </View>
        <View style={styles.bodyContent} >
          <Image source={require('../img/logo.png')} style={styles.logoSize} />
          <Text style={styles.whiteText}>by Bizantinos</Text>
        </View>
        <View style={styles.footerContent} >
          { this.state.check ? 
            ( 
              <Button full transparent onPress={this.onPressLogin}>
                <Icon style={styles.whiteText} name='logo-googleplus' />
                <Text style={styles.whiteText}>Comenzar a jugar</Text>
              </Button>
            )
            :
            ( 
              <Button full transparent>
                <Spinner color='#FFF' ></Spinner>
                <Text style={styles.whiteText}>Cargando...</Text>
              </Button>
            )
          }
        </View>        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: '#00AE33'
  },
  imageContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%'
  },
  bodyContent: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center'
  },
  footerContent: {
    backgroundColor: '#00AE33'
  },
  imageBackground: {
    flex: 1, 
    resizeMode: 'cover', 
    height: undefined, 
    width: undefined
  },
  whiteText: {
    color:"#FFF"
  },
  logoSize: {
    height: 60, 
    width: 60
  }
});
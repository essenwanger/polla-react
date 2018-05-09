import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Content, Thumbnail, Card, CardItem, Icon, Text, Button } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import firebase from 'react-native-firebase';
import GoogleSignIn from 'react-native-google-sign-in';

export default class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: props.user
    };
    this.onPressLogout = this.onPressLogout.bind(this);
    this.onPressTerms = this.onPressTerms.bind(this);
    this.onPressAbout = this.onPressAbout.bind(this);
    
  }

  onPressAbout(){
    Actions.about();
  }

  onPressTerms(){
    Actions.terms({presentationMode: 'Terms'});
  }

  onPressLogout(){
    GoogleSignIn.signOut();
    Actions.reset('login');
  }

  onPressPhase(){
  }

  componentDidMount() {
    try {
      GoogleSignIn.configure({
        clientID: '776210840524-fmk9pos1c23kfnempoi2ntjshdsd9865.apps.googleusercontent.com',
        serverClientID: '776210840524-bolhuiog2030t59paeo9b9r03nhtqn1f.apps.googleusercontent.com'
      });
  
    } catch(err) {
      console.log("Play services error", err.code, err.message);
    }
  }

  render() {
    return (
        <Content padder>
          <Grid>
            <Col style={{ alignItems: 'center', height: 240, justifyContent: 'center' }}>
              <Thumbnail large source={{uri: this.state.user.profile.picture}}
              style={{ borderColor: '#000000', borderWidth: 0.2}}/>
              <Text>{this.state.user.profile.givenName} DEMO 3</Text>
            </Col>
          </Grid>
          <Card>
            <CardItem bordered>
              <Button info block transparent small onPress={this.onPressAbout}><Icon name='md-ionitron'/><Text>Acerca de Bizantinos</Text></Button>
            </CardItem>
            <CardItem bordered>
              <Button info block transparent small onPress={this.onPressTerms}><Icon name='md-glasses'/><Text>Terminos</Text></Button>
            </CardItem>
            <CardItem>
              <Button danger block transparent small onPress={this.onPressLogout} ><Icon name='md-close-circle'/><Text>Cerrar Sesion</Text></Button>
            </CardItem>
          </Card>
        </Content>
    );
  }
}
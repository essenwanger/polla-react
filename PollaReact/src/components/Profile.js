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
  }

  onPressTerms(){
    Actions.terms({presentationMode: 'Terms'});
  }

  onPressLogout(){
    GoogleSignIn.signOut();
    Actions.login();
  }

  onPressPhase(){
  }

  componentDidMount() {
    try {
      GoogleSignIn.configure({
        clientID: '991338042977-7nqq3btnte4rolituui9uivhhoub6aqc.apps.googleusercontent.com'
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
              <Thumbnail large source={{uri: this.state.user.picture}}
              style={{ borderColor: '#000000', borderWidth: 0.2}}/>
              <Text>{this.state.user.givenName}</Text>
            </Col>
          </Grid>
          <Card>
            <CardItem bordered>
              <Button info block transparent small><Icon name='md-information-circle'/><Text>Acerca de #</Text></Button>
            </CardItem>
            <CardItem bordered>
              <Button primary block transparent small onPress={this.onPressTerms}><Icon name='md-checkmark-circle'/><Text>Terminos</Text></Button>
            </CardItem>
            <CardItem>
              <Button danger block transparent small onPress={this.onPressLogout} ><Icon name='md-close-circle'/><Text>Cerrar Sesion</Text></Button>
            </CardItem>
          </Card>
        </Content>
    );
  }
}
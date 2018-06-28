import React, { Component } from 'react';
import { StyleSheet, View, WebView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Content, Text, Button, Spinner } from 'native-base';
import firebase from 'react-native-firebase';
import HeaderPolla from '../components/HeaderPolla';
import HTMLView from 'react-native-htmlview';

export default class TermsScene extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: props.user,//Para apuestas adicionales enviar siempre.
      terms: null
    };    
    this.onAcceptTerms = this.onAcceptTerms.bind(this);
  }

  componentDidMount() {
    firebase.database().ref('terms').once('value').then((snapshot)=>{
      this.setState({terms: snapshot.val()});
    });
  }

  onAcceptTerms(){
    //alta de usuario en /users/{id-google}/
    var userFirebase = {
      profile: this.state.user
    };
    firebase.database().ref('users/' + this.state.user.userID + '/').set(userFirebase);

    //Navegando al dashboard 
    Actions.reset('createBetScore', {user: userFirebase});
  }

  _renderHeader(){
    return (<HeaderPolla name='Terminos y condiciones' />);
  }
  
  _renderButton(){
    return (<Button full success onPress={this.onAcceptTerms}>
      <Text>Aceptar</Text>
    </Button>);
  }

  _renderHtml(){
    if(this.state.terms === null) {
      return (<Spinner color='#000' ></Spinner>);
    }else{
      return (<HTMLView value={this.state.terms.description} stylesheet={styles} />);
    }
  }

  render() {
    return (
      <Container>
        {this._renderHeader()}
        <Content>
          {this._renderHtml()}
          {this._renderButton()}
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  div: {
    padding: 10,    
  },
  h3: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  h4: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  p: {
    textAlign: 'justify'
  }
});
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Content, Card, CardItem, Text, Body, H3, Button, H2, H1 } from 'native-base';
import firebase from 'react-native-firebase';
import HeaderPolla from '../components/HeaderPolla';

export default class TermsScene extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: props.user,//Para apuestas adicionales enviar siempre.
      matches: {},
      roups: [],
      positionTable: [], 
      codeTypeOfBet: props.codeTypeOfBet === undefined ? 'all' : props.codeTypeOfBet,
      typeOfBet: {},
      presentationMode : props.presentationMode === undefined ? 'Login' : props.presentationMode
    };    
    this.onAcceptTerms = this.onAcceptTerms.bind(this);
  }

  componentDidMount() {
    if(this.state.presentationMode === 'Login') {
      this.prepareLogin();
    }
  }

  prepareLogin() {
    //preparando matches
    firebase.database().ref('matches/').once('value').then((snapshot)=>{
      var matches={};
      var groups=[];
      snapshot.forEach(function(childSnapshot) {
        var item = childSnapshot.val();
        var key = childSnapshot.key;
        if(item.group!=='' && matches[item.group]===undefined){
          groups.push({group: item.group, percentage: '0'});
          matches[item.group]=[];
        }
        if(item.group==='' && matches[item.round]===undefined){
          groups.push({group: item.round, percentage: '0'});
          matches[item.round]=[];
        }
        if(item.group!==''){
          matches[item.group][key]=item;
        }
        if(item.group===''){
          matches[item.round][key]=item;
        }
      });
      this.setState({
        groups: groups,
        matches: matches
      });
    });

    //preparando positionTable
    firebase.database().ref('positionTable/').once('value').then((snapshot)=>{
      var positionTable=[];
      snapshot.forEach(function(childSnapshot) {
        positionTable.push(childSnapshot);
      });
      this.state.positionTable = snapshot;
    });

    firebase.database().ref('typeBets/'+this.state.codeTypeOfBet).once('value').then((snapshot)=>{
      this.setState({typeOfBet: snapshot.val()});
    });
  }

  onAcceptTerms(){

    var preBet = {
      profile: this.state.user,//Verificar que exista primero
      completed: false,
      payable: false,
      matches: this.state.matches,
      groups: this.state.groups,
      positionTable: this.state.positionTable,
      date: new Date()
    };

    var refPreBets = firebase.database().ref('preBets' + this.state.typeOfBet.suffix);
    var refPrePush = refPreBets.push(preBet);

    //alta de usuario en /users/{id-google}/
    var userFirebase = {
      profile: this.state.user
    };
    firebase.database().ref('users/' + this.state.user.userID + '/').set(userFirebase);
    firebase.database().ref('users/' + this.state.user.userID + '/bets/'+ this.state.codeTypeOfBet + '/0').set({
      betKey: refPrePush.key,
      completed: false
    });


    //alta del usuario en el ranking /ranking/
    var subscribed = {
      profile: this.state.user,
      count: 1      
    };
    firebase.database().ref('subscribed' + this.state.typeOfBet.suffix + '/' + this.state.user.userID + '/').set(subscribed);

    //Navegando al dashboard 
    Actions.reset('dashboard', {user: userFirebase, betKey: refPrePush.key});
  }

  _renderHeader(){
    if(this.state.presentationMode === 'Login') {
      return (<HeaderPolla pop={false} name='Terminos y condiciones' />);
    }else{
      return (<HeaderPolla pop={true}  name='Terminos y condiciones' />);
    }
  }
  _renderButton(){
    if(this.state.presentationMode === 'Login') {
      return (<Button full success onPress={this.onAcceptTerms}>
                <Text>Aceptar</Text>
              </Button>);
    }
  }

  render() {
    return (
      <Container>
        {this._renderHeader()}
        <Content>
          <Card>
            <CardItem>
              <Body>
                <Text>{this.state.typeOfBet.descriptionRules}</Text>
              </Body>
            </CardItem>
         </Card>
         {this._renderButton()}
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  numberFont: {
    //fontWeight: 'bold',
    //fontSize: 10,
  },
  textFont: {
    fontWeight: 'normal',
    //fontSize: 10,
  },
});
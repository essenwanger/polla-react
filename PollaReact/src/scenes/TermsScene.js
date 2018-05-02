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
      user: props.user,
      createUser: false,
      matches: {},
      groups: [],
      positionTable: [], 
      codeTypeOfBet: props.codeTypeOfBet === undefined ? 'all' : props.codeTypeOfBet,
      typeOfBet: {},
      presentationMode : props.presentationMode === undefined ? 'Subscribe' : props.presentationMode,
      countBets: 0
    };    
    this.onAcceptTerms = this.onAcceptTerms.bind(this);
  }

  componentDidMount() {
    if(this.state.presentationMode === 'Subscribe') {
      this.prepareSubscribe();
    }
    this.prepareTerm();
  }

  prepareSubscribe() {
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
  }

  prepareTerm() {
    firebase.database().ref('users/'+this.user.userID).once('value').then((snapshot)=>{
      if(snapshot.val()===null){
        this.setState({createUser: true});
      } else {
        this.setState({user: snapshot.val()});
      }
    });
    firebase.database().ref('typeBets/'+this.codeTypeOfBet).once('value').then((snapshot)=>{
      this.setState({typeOfBet: snapshot.val()});
      firebase.database().ref('subscribed' + this.state.typeOfBet.suffix + '/' + this.state.user.userID + '/').once('value').then((snapshot)=>{
        this.setState({countBets: snapshot.val().count});
      });
    });
    
  }

  onAcceptTerms(){

    //Crear Apuesta
    var dateTerms = dateUTCMinus5();
    var preBet = {
      profile: this.state.user,
      completed: false,
      payable: false,
      matches: this.state.matches,
      groups: this.state.groups,
      positionTable: this.state.positionTable,
      date: dateTerms
    };
    var refPreBets = firebase.database().ref('preBets' + this.state.typeOfBet.suffix);
    var refPrePush = refPreBets.push(preBet);

    //alta de usuario en /users/{id-google}/
    var userFirebase = {};
    if (this.state.createUser) {//Alta de Usuario
      userFirebase = {
        profile: this.state.user
      };
      firebase.database().ref('users/' + this.state.user.userID + '/').set(userFirebase);

      //alta del usuario en el ranking /ranking/
      var subscribed = {
        profile: this.state.user,
        count: 1      
      };
      firebase.database().ref('subscribed' + this.state.typeOfBet.suffix + '/' + this.state.user.userID + '/').set(subscribed);

    } else {
      userFirebase = {
        profile: this.state.user
      };
      firebase.database().ref('subscribed' + this.state.typeOfBet.suffix + '/' + this.state.user.userID + '/count').set((this.state.countBets+1));
    }

    var userBet = {
      betKey: refPrePush.key,
      completed: false
    };
    firebase.database().ref('users/' + this.state.user.userID + '/bets/'+ this.state.codeTypeOfBet + '/'+ refPrePush.key).set(userBet);

    //Navegando al dashboard 
    Actions.reset('dashboard', {user: userFirebase});
  }

  dateUTCMinus5(){
    var d = new Date();
    var localTime = d.getTime();
    var localOffset = d.getTimezoneOffset() * 60000;
    var utc = localTime + localOffset;
    var offset = -5; //Peru
    var timePeru = utc + (3600000*offset);
    return new Date(timePeru); 
  }

  _renderHeader(){
    if(this.state.presentationMode === 'Subscribe') {
      return (<HeaderPolla pop={false} name='Terminos y condiciones' />);
    }else{
      return (<HeaderPolla pop={true}  name='Terminos y condiciones' />);
    }
  }
  _renderButton(){
    if(this.state.presentationMode === 'Subscribe') {
      return (<Button block onPress={this.onAcceptTerms}>
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
                <Text>Ingrese sus resultados de la fase de grupos.</Text>
              </Body>
            </CardItem>
            <CardItem>
              <Body>
                <Text>Cada acierto le da tres (3) puntos al jugador.</Text>
              </Body>
            </CardItem>
            <CardItem>
              <Body>
                <Text>Para la siguiente ronda, ubique los equipos clasificados en cada una de las posiciones correspondientes</Text>
              </Body>
            </CardItem>
            <CardItem>
              <Body>
                <Text>Cada acierto en las posiciones (ambos equipos) le da un (1) punto al jugador</Text>
              </Body>
            </CardItem>
            <CardItem>
              <Body>
                <Text>Para fase de llaves, escoja el equipo ganador en cada partido. En caso de empate en los primeros noventa (90) minutos, marque con una equis (X) y ponga el equipo que ganará en tiempo extra o penaltis. Cada acierto en el ganador le da tres (3) puntos. En caso de escoger empate en los primeros noventa (90) minutos del partido, debe elegir quién gana en tiempo extra o penaltis. En caso de acertar, gana tres (3) puntos: uno (1) por el empate y dos (2) por el ganador</Text>
              </Body>
            </CardItem>
            <CardItem>
              <Body>
                <Text>El jugador que tenga más puntos al final del torneo, gana la polla</Text>
              </Body>
            </CardItem>
            <CardItem footer>
              <Text>Bizantinos</Text>
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
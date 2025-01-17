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
      typeOfBet: props.typeOfBet === undefined ? 'All' : props.typeOfBet,
      presentationMode : props.presentationMode === undefined ? 'Login' : props.presentationMode,
      textButton: props.presentationMode === undefined ? 'Aceptar' : ' Salir'
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

    var refPreBets = firebase.database().ref('preBets' + this.state.typeOfBet);
    var refPrePush = refPreBets.push(preBet);

    //alta de usuario en /users/{id-google}/
    var userFirebase = {
      profile: this.state.user,
      bets: [
        {
          betKey: refPrePush.key,
          completed: false
        }
      ]
    };
    firebase.database().ref('users/' + this.state.user.userID + '/').set(userFirebase);

    //alta del usuario en el ranking /ranking/
    var subscribed = {
      profile: this.state.user,
      count: 1      
    };
    firebase.database().ref('subscribed' + this.state.typeOfBet + '/' + this.state.user.userID + '/').set(subscribed);

    //Navegando al dashboard 
    Actions.reset('dashboard', {user: userFirebase});
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
      return (<Button block onPress={this.onAcceptTerms}>
                <Text>{this.state.textButton}</Text>
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
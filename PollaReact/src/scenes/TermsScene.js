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
      matches: [],
      positionTable: [],      
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
      var matches=[];
      snapshot.forEach(function(childSnapshot) {
        var item = childSnapshot.val();
        matches.push(item);
      });
      this.state.matches = matches;
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
    /*
    if(this.state.presentationMode === 'Login') {
      this.saveUser();
    } else {
      Actions.pop();
    }*/
    this.saveUser();
  }

  saveUser() {
    //alta de usuario en /users/{id-google}/
    var userFirebase = {
      profile: this.state.user,
      bets: [
        {
          status: "Creado",
          pay: "Pendiente",
          matches: this.state.matches,
          positionTable: this.state.positionTable
        }
      ]
    };
    firebase.database().ref('users/' + this.state.user.userID + '/').set(userFirebase);

    //alta del usuario en el ranking /ranking/
    var rank = {
      bet: 0,
      points: 0,
      profile: this.state.user
    };
    firebase.database().ref('ranking/' + this.state.user.userID + '/').set(rank);

    //Navegando al dashboard 
    Actions.reset('dashboard', {user: this.state.user});
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
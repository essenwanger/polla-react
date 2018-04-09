import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Content, Card, CardItem, Text, Body, H3, Button, H2, H1 } from 'native-base';
import firebase from 'react-native-firebase';

export default class TermsScene extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
      matches: [],
      positionTable: []
    };
    this.onAcceptTerms = this.onAcceptTerms.bind(this);
  }

  componentDidMount() {
    //obteniendo matches
    firebase.database().ref('matches/').once('value').then((snapshot)=>{
      var matches=[];
      snapshot.forEach(function(childSnapshot) {
        var item = childSnapshot.val();
        matches.push(item);
      });
      this.state.matches = matches;
    });

    //obteniendi positionTable
    firebase.database().ref('positionTable/').once('value').then((snapshot)=>{
      var positionTable=[];
      snapshot.forEach(function(childSnapshot) {
        positionTable.push(childSnapshot);
      });
      this.state.positionTable = snapshot;
    });
  }

  onAcceptTerms(){

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

    Actions.reset('dashboard', {user: this.state.user});
  }

  render() {
    return (
      <Container>
        <Header />
        <Content>
          <Card>
            <CardItem header>
              <H3>Terminos y condiciones</H3>
            </CardItem>
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
         <Button block onPress={this.onAcceptTerms}>
            <Text>Acepto</Text>
          </Button>
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
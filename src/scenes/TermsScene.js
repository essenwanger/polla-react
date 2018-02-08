import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Content, Card, CardItem, Text, Body, H3, Button } from 'native-base';

export default class TermsScene extends Component {

  onPressLogin(){
    Actions.fixture();
  }

  render() {
    return (
      <Container>
        <Header />
        <Content>
          <Card>
            <CardItem header>
              <Text>Terminos y condiciones</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text>Las reglas del juego son:</Text>
                <Text style={styles.bigblue}>1. <Text>Ingrese sus resultados de la fase de grupos.</Text></Text>
                <Text style={styles.bigblue}>2. <Text>Cada acierto le da tres (3) puntos al jugador</Text></Text>
                <Text style={styles.bigblue}>3. <Text>Para la siguiente ronda, ubique los equipos clasificados en cada una de las posiciones correspondientes</Text></Text>
                <Text style={styles.bigblue}>4. <Text>Cada acierto en las posiciones (ambos equipos) le da un (1) punto al jugador</Text></Text>
                <Text style={styles.bigblue}>5. <Text>Para fase de llaves, escoja el equipo ganador en cada partido. En caso de empate en los primeros noventa (90) minutos, marque con una equis (X) y ponga el equipo que ganará en tiempo extra o penaltis. Cada acierto en el ganador le da tres (3) puntos. En caso de escoger empate en los primeros noventa (90) minutos del partido, debe elegir quién gana en tiempo extra o penaltis. En caso de acertar, gana tres (3) puntos: uno (1) por el empate y dos (2) por el ganador</Text></Text>
                <Text style={styles.bigblue}>6. <Text>El jugador que tenga más puntos al final del torneo, gana la polla</Text></Text>
              </Body>
            </CardItem>
            <CardItem footer>
              <Text>Bizantinos</Text>
            </CardItem>
         </Card>
         <Button block onPress={this.onPressLogin}>
            <Text>Acepto</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  bigblue: {
    fontWeight: 'bold',
    fontSize: 10,
  },
});
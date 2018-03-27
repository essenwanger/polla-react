import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Content, Card, CardItem, Text, Button, Footer, FooterTab } from 'native-base';
import Match from './../components/Match';
import PositionTableTeam from './../components/PositionTableTeam';
import ContainerMenu from './../components/ContainerMenu';
import firebase from 'react-native-firebase';

export default class PhaseScene extends Component {

  constructor() {
    super();
    this.onPressRanking = this.onPressRanking.bind(this);
  }

  onPressRanking(){
  }

  onScore(id, team, score){
  }

  componentDidMount() {
  }

  render() {
    return (
      <ContainerMenu name={'Polla'}>
        <Content padder>
          <Card>
            <CardItem bordered={true}>
              <Text>Grupo A</Text>
            </CardItem>
            <Match id={1} teamFlag1={'rus.png'} teamFlag2={'ksa.png'} onScore={this.onScore}/>
            <Match id={1} teamFlag1={'rus.png'} teamFlag2={'ksa.png'} onScore={this.onScore}/>
            <Match id={1} teamFlag1={'rus.png'} teamFlag2={'ksa.png'} onScore={this.onScore}/>
            <Match id={1} teamFlag1={'rus.png'} teamFlag2={'ksa.png'} onScore={this.onScore}/>
            <Match id={1} teamFlag1={'rus.png'} teamFlag2={'ksa.png'} onScore={this.onScore}/>
            <Match id={1} teamFlag1={'rus.png'} teamFlag2={'ksa.png'} onScore={this.onScore}/>
          </Card>
          <Card>
            <CardItem bordered={true}>
              <Text>Tabla de posiciones</Text>
            </CardItem>
            <PositionTableTeam flag={'rus.png'} name={'RUS'} mp={3} gf={10} ga={4} pt={4} />
            <PositionTableTeam flag={'ksa.png'} name={'RUS'} mp={3} gf={10} ga={4} pt={4} />
            <PositionTableTeam flag={'rus.png'} name={'RUS'} mp={3} gf={10} ga={4} pt={0} />
            <PositionTableTeam flag={'rus.png'} name={'RUS'} mp={3} gf={10} ga={4} pt={6} />
          </Card>
        </Content>
        <Footer>
          <FooterTab>
            <Button>
              <Text></Text>
            </Button>
            <Button>
              <Text>Grupo B</Text>
            </Button>
          </FooterTab>
        </Footer>
      </ContainerMenu>
    );
  }
}
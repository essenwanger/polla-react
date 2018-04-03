import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Container, Tabs, Tab, TabHeading, Icon, Content, Card, Text, Button, Footer, FooterTab } from 'native-base';
import HeaderPolla from './../components/HeaderPolla';
import Match from './../components/Match';
import PositionTableTeam from './../components/PositionTableTeam';
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
      <Container>
        <HeaderPolla pop={true} name={'Grupo A'} />
        <Tabs>
          <Tab heading={ <TabHeading><Icon name="md-calendar" /></TabHeading>}>
            <Content padder>
              <Card>
                <Match id={1} team1={'RU'} team2={'UY'} onScore={this.onScore}/>
                <Match id={1} team1={'RU'} team2={'UY'} onScore={this.onScore}/>
                <Match id={1} team1={'RU'} team2={'UY'} onScore={this.onScore}/>
                <Match id={1} team1={'RU'} team2={'UY'} onScore={this.onScore}/>
                <Match id={1} team1={'RU'} team2={'UY'} onScore={this.onScore}/>
                <Match id={1} team1={'RU'} team2={'UY'} onScore={this.onScore}/>
              </Card>
            </Content>
          </Tab>
          <Tab heading={ <TabHeading><Icon name="md-grid" size={27} color="#fff" /></TabHeading>}>
            <Content padder>
              <Card>
                <PositionTableTeam team={'PE'} name={'RUS'} mp={3} gf={10} ga={4} pt={4} />
                <PositionTableTeam team={'PE'} name={'RUS'} mp={3} gf={10} ga={4} pt={4} />
                <PositionTableTeam team={'PE'} name={'RUS'} mp={3} gf={10} ga={4} pt={0} />
                <PositionTableTeam team={'PE'} name={'RUS'} mp={3} gf={10} ga={4} pt={6} />
              </Card>
            </Content>
          </Tab>
        </Tabs>
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
      </Container>
    );
  }
}
import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Container, Tabs, Tab, TabHeading, Icon, Content, Card, Text, Button, Footer, FooterTab } from 'native-base';
import HeaderPolla from './../components/HeaderPolla';
import Match from './../components/Match';
import PositionTableTeam from './../components/PositionTableTeam';
import firebase from 'react-native-firebase';

export default class PhaseScene extends Component {

  constructor(props) {
    super(props);
    this.onPressRanking = this.onPressRanking.bind(this);
  }

  onPressRanking(){
  }

  onScore(id, team, score){
  }

  componentDidMount() {
  }

  render() {
    var matches=this.props.groups[this.props.group].matches;
    var matchesComponent=Object.keys(matches).map((item, key) => (
      <Match key={item} id={item} team1={matches[item].team1} 
      team2={matches[item].team2} onScore={this.onScore}/>
    ));
    //TODO ordenar en caso no cambie la logica de la tabla
    var positionT=this.props.groups[this.props.group].positionTable;
    var positionTableComponent=Object.keys(positionT).map((item, key) => (
      <PositionTableTeam key={item} team={item} name={item} 
      mp={positionT[item].played} gf={positionT[item].goalsFor} 
      ga={positionT[item].goalsAgainst} pt={positionT[item].points} />
    ));
    return (
      <Container>
        <HeaderPolla pop={true} name={'Grupo '+ this.props.group} />
        <Tabs>
          <Tab heading={ <TabHeading><Icon name="md-calendar" /></TabHeading>}>
            <Content padder>
              <Card>
                {matchesComponent}
              </Card>
            </Content>
          </Tab>
          <Tab heading={ <TabHeading><Icon name="md-grid" size={27} color="#fff" /></TabHeading>}>
            <Content padder>
              <Card>
                {positionTableComponent}
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
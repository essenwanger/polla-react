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
    var matches=Object.keys(this.props.groups[this.props.group]).map((item, key) => (
      <Match key={item} id={item} team1={this.props.groups[this.props.group][item].team1} 
      team2={this.props.groups[this.props.group][item].team2} onScore={this.onScore}/>
    ));
    return (
      <Container>
        <HeaderPolla pop={true} name={'Grupo '+ this.props.group} />
        <Tabs>
          <Tab heading={ <TabHeading><Icon name="md-calendar" /></TabHeading>}>
            <Content padder>
              <Card>
                {matches}
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
import React, { Component } from 'react';
import { Content, Spinner, Card, Container, Header, Body, Title, Button, Icon, Text } from 'native-base';
import { StyleSheet} from 'react-native';
import Match from './Match';
import MatchStaticGroup from './MatchStaticGroup';
import MatchStaticRound from './MatchStaticRound';

export default class Matches extends Component {

  constructor(props) {
    super(props);
    this.onChangeScore = this.onChangeScore.bind(this);
    this.onScore = this.onScore.bind(this);
    this.state = { 
      active: this.props.active,
      updates: {}
    };
  }

  onChangeScore(id, typeScore, score){
    let updates = this.state.updates;
    if(typeScore==='1'){
      updates['preBetsAll/' + this.props.betKey + '/matches/' + this.props.groupKey + '/' + id + '/scoreTeam1'] = score;
    }else if(typeScore==='2'){
      updates['preBetsAll/' + this.props.betKey + '/matches/' + this.props.groupKey + '/' + id + '/scoreTeam2'] = score;
    }else if(typeScore==='1P'){
      updates['preBetsAll/' + this.props.betKey + '/matches/' + this.props.groupKey + '/' + id + '/scorePenaltyTeam1'] = score;
    }else if(typeScore==='2P'){
      updates['preBetsAll/' + this.props.betKey + '/matches/' + this.props.groupKey + '/' + id + '/scorePenaltyTeam2'] = score;
    }
    this.setState({
      active: true,
      updates: updates
    });
  }

  onScore(){
    this.setState({
      active: false
    });
    let updates = this.state.updates;
    this.props.onScore(updates);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      active: nextProps.active
    });
  }

  render() {
    var matchesComponent=null;
    if(this.props.status==='opened'){
      matchesComponent=this.props.matches.map((item, key) => (
        <Match key={item.id} data={item} onChangeScore={this.onChangeScore}/>
      ));
      matchesComponent=<Card>{matchesComponent}</Card>;
    }else{
      if(this.props.groupKey.length===1){
        matchesComponent=this.props.matches.map((item, key) => (
          <MatchStaticGroup key={item.id} data={item} />
        ));
        matchesComponent=<Card>{matchesComponent}</Card>;
      }else{
        matchesComponent=this.props.matches.map((item, key) => (
          <MatchStaticRound key={item.id} data={item} />
        ));
      }
    }
    if(this.props.matches.length===0){
      return (
        <Content padder>
          <Spinner color='#000' ></Spinner>
        </Content>
      );
    }else{
      return (
        <Container>
          {this.props.status==='opened' &&
            <Header style={styles.header} >
              <Body>
                {this.state.active ?
                  (
                    <Button success block onPress={this.onScore}>
                      <Icon name='ios-checkmark-circle-outline'/><Text>Guardar Apuesta</Text>
                    </Button>
                  )
                  :
                  (
                    <Button success disabled block>
                      <Icon name='ios-checkmark-circle-outline'/><Text>Guardar Apuesta</Text>
                    </Button>
                  )
                }
              </Body>
            </Header>
          }
          <Content padder>
              {matchesComponent}
          </Content>
        </Container>
      );
    }
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#FFF",
    borderBottomWidth: null
  }
});
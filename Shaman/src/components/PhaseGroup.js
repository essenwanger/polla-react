import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Content, Card, CardItem, Text, Body, Button, 
  Item, Input, Thumbnail, Left, Right, Footer, FooterTab, Spinner, Icon } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Flag } from './Helpers';
import {Platform, StyleSheet} from 'react-native';
import Match from './Match';
import MatchStaticGroup from './MatchStaticGroup';
import MatchStaticRound from './MatchStaticRound';
import PositionTableTeam from './PositionTableTeam';
import firebase from 'react-native-firebase';

const styles = StyleSheet.create({
  footer: {
    height: Platform.OS === 'ios' ? 280 : 300
  },
  foo: {
    height: 0,
    backgroundColor: 'white'
  },
  header: {
    backgroundColor: "#FFF",
    borderBottomWidth: null
  }
});

export default class PhaseGroup extends Component {

  constructor(props) {
    super(props);
    this.onPressTable = this.onPressTable.bind(this);
    this.onChangeScore = this.onChangeScore.bind(this);
    this.onScore = this.onScore.bind(this);
    this.state = {
      active: this.props.active,
      updates: {},
      status: this.props.status,
      bet: props.bet,
      matches: [],
      positionTable: []
    };
  }

  componentWillMount() {
    this.dataFirebase(this.props);
  }

  dataFirebase(props){
    var betKey= props.bet;
    var groupKey= props.group;
    this.setState({
      matches: []
    });
    var betNode= this.state.status==='opened'? 'preBets'+props.userBet.suffix+'/' : 'bets'+props.userBet.suffix+'/'
    firebase.database().ref(betNode+betKey+'/matches/'+groupKey+'/')
    .once('value').then((snapshot)=>{
      var matches = [];
      snapshot.forEach((childSnapshot)=>{
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();
        childData.key=childKey;
        matches.push(childData);
      });
      this.setState({
        matches: matches
      });
    });
  }

  onPressTable(){
    if(!this.state.visible){
      var betKey= this.props.bet;
      var groupKey= this.props.group;
      this.setState({
        positionTable: []
      });
      var betNode= this.state.status==='opened'? 'preBets'+this.props.userBet.suffix+'/' : 'bets'+this.props.userBet.suffix+'/'
      firebase.database().ref(betNode+betKey+'/positionTable/'+groupKey+'/')
      .once('value').then((snapshot)=>{
        var positionTable = [];
        snapshot.forEach((childSnapshot)=>{
          var childKey = childSnapshot.key;
          var childData = childSnapshot.val();
          positionTable.push(childData);
        });
        this.setState({
          positionTable: positionTable
        });
      });
    }
    this.setState({visible: !this.state.visible});
  }

  onChangeScore(id, typeScore, score){
    let updates = this.state.updates;
    var betKey= this.props.bet;
    var groupKey= this.props.group;
    if(typeScore==='1'){
      updates['preBets'+this.props.userBet.suffix+'/' + betKey + '/matches/' + groupKey + '/' + id + '/scoreTeam1'] = score;
    }else if(typeScore==='2'){
      updates['preBets'+this.props.userBet.suffix+'/' + betKey + '/matches/' + groupKey + '/' + id + '/scoreTeam2'] = score;
    }else if(typeScore==='1P'){
      updates['preBets'+this.props.userBet.suffix+'/' + betKey + '/matches/' + groupKey + '/' + id + '/scorePenaltyTeam1'] = score;
    }else if(typeScore==='2P'){
      updates['preBets'+this.props.userBet.suffix+'/' + betKey + '/matches/' + groupKey + '/' + id + '/scorePenaltyTeam2'] = score;
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
    firebase.database().ref('typeBets/'+this.props.userBet.type+'/status/').once('value').then((snapshot)=>{
      if(snapshot.val()==='opened'){
        var betKey= this.props.bet;
        var groupKey= this.props.group;
        var position= this.props.position;
        var suffix = this.props.userBet.suffix;
        firebase.database().ref().update(updates);
        firebase.database().ref('preBets'+suffix+'/'+betKey+'/matches/'+groupKey+'/')
        .once('value').then((snapshot)=>{
          var total = 0;
          var complete = 0;
          snapshot.forEach((childSnapshot)=>{
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();
            total=total+2;
            if(childData.scoreTeam1!==''){
              complete=complete+1;
            }
            if(childData.scoreTeam2!==''){
              complete=complete+1;
            }
          });
          var percentage=complete/total;
          percentage=Math.round(percentage * 10000) / 100;
          firebase.database().ref('preBets'+suffix+'/'+betKey+'/groups/'+position+'/').update({
            percentage: percentage
          }).then(function(){
            firebase.database().ref('preBets'+suffix+'/'+betKey+'/groups/')
            .once('value').then((snapshot)=>{
              var completed=true;
              snapshot.forEach((childSnapshot)=>{
                var childData = childSnapshot.val();
                if(childData.percentage!==100){
                  completed=false;
                }
              });
              firebase.database().ref('preBets'+suffix+'/'+betKey+'/').update({
                completed: completed
              });
            });
          });
        });
      }else{
        var user=this.props.user;
        Actions.reset('dashboard', {user: user});
      }
    });
  }

  render() {
    var matchesComponent=null;
    if(this.props.status==='opened'){
      matchesComponent=this.state.matches.map((item, key) => (
        <Match key={item.id} data={item} onChangeScore={this.onChangeScore}/>
      ));
      matchesComponent=<Card>{matchesComponent}</Card>;
    }else{
      if(this.props.group.length===1){
        matchesComponent=this.state.matches.map((item, key) => (
          <MatchStaticGroup key={item.id} data={item} />
        ));
        //matchesComponent={matchesComponent};
      }else{
        matchesComponent=this.state.matches.map((item, key) => (
          <MatchStaticRound key={item.id} data={item} />
        ));
      }
    }
    var footer=null;
    if(this.props.group.length===1){
      footer=(
        <Footer>
          <FooterTab>
            <Button onPress={()=> this.onPressTable()}>
              <Text>Tabla de Posiciones</Text>
            </Button>
          </FooterTab>
        </Footer>);
    }
    var positionTableComponent=this.state.positionTable.map((item, key) => (
      <PositionTableTeam key={item.team} team={item.team} name={item.teamName} 
      mp={item.played} gf={item.goalsFor} 
      ga={item.goalsAgainst} pt={item.points} />
    ));
    if(this.state.matches.length===0){
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
          <Content>
            {matchesComponent}
          </Content>
          {footer}
          <Footer style={[styles.foo, this.state.visible && styles.footer]}>
          {this.state.positionTable.length===0 ?
            (<Spinner color='#000' ></Spinner>)
            :
            (<Card>
            <CardItem bordered>
              <Left>
                <Body>
                  <Text>Equipos</Text>
                </Body>
              </Left>
              <Right>
                <Grid>
                  <Col style={{ alignItems: 'flex-end', justifyContent: 'center'}}>
                    <Text>MP</Text>
                  </Col>
                  <Col style={{ alignItems: 'flex-end', justifyContent: 'center'}}>
                    <Text>GF</Text>
                  </Col>
                  <Col style={{ alignItems: 'flex-end', justifyContent: 'center'}}>
                    <Text>GA</Text>
                  </Col>
                  <Col style={{ alignItems: 'flex-end', justifyContent: 'center'}}>
                    <Text>PT</Text>
                  </Col>
                </Grid>
              </Right>
            </CardItem>
            {positionTableComponent}
          </Card>)
          }
          </Footer>
        </Container>
      );
    }
  }
}
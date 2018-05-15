import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Container, Tabs, Tab, TabHeading, Icon } from 'native-base';
import HeaderPolla from './../components/HeaderPolla';
import Matches from './../components/Matches';
import PositionTable from './../components/PositionTable';
import FooterPhase from './../components/FooterPhase';
import firebase from 'react-native-firebase';

export default class PhaseScene extends Component {

  constructor(props) {
    super(props);
    this.onPressButton = this.onPressButton.bind(this);
    this.onScore = this.onScore.bind(this);
    this.state = {
      status: this.props.status,
      bet: props.bet,
      matches: [],
      positionTable: []
    };
  }

  onPressButton(position){
    var groups=this.props.groups;
    var group=groups[position].group;
    if(group.length!==1 && this.tabView.state.currentPage===1){
      this.tabView.goToPage(0);
      setTimeout(() => {
        Actions.refresh({user: this.props.user, status: this.state.status, 
        groups: this.props.groups, bet: this.state.bet, position: position, active: false});
      }, 500);
    }else{
      Actions.refresh({user: this.props.user, status: this.state.status, 
        groups: this.props.groups, bet: this.state.bet, position: position, active: false});
    }
  }

  onScore(updates){
    firebase.database().ref('typeBets/all/status/').once('value').then((snapshot)=>{
      if(snapshot.val()==='opened'){
        var betKey= this.state.bet;
        var position= this.props.position;
        var groupKey= this.props.groups[position].group;
        firebase.database().ref().update(updates);
        firebase.database().ref('preBetsAll/'+betKey+'/matches/'+groupKey+'/')
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
          firebase.database().ref('preBetsAll/'+betKey+'/groups/'+position+'/').update({
            percentage: percentage
          });
        });
      }else{
        var user=this.props.user;
        Actions.reset('dashboard', {user: user});
      }
    });
  }

  componentWillMount() {
    this.dataFirebase(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.dataFirebase(nextProps);
  }

  updateData(){
    this.dataFirebase(this.props);
  }

  dataFirebase(props){
    var betKey= props.bet;
    var groupKey= props.groups[props.position].group;
    this.setState({
      matches: [],
      positionTable: []
    });
    var betNode= this.state.status==='opened'? 'preBetsAll/' : 'betsAll/'
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
    if(groupKey.length===1){
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
  }

  render() {
    let betKey= this.state.bet;
    let groups=this.props.groups;
    let groupKey=groups[this.props.position].group;
    let groupName=groupKey.length===1 ? ('Grupo '+groupKey) : (groupKey);
    return (
      <Container>
        <HeaderPolla pop name={groupName} user={this.props.user} />
        <Tabs ref={(tabView) => { this.tabView = tabView }} onChangeTab={({ i, ref, from })=> this.updateData()}>
          <Tab heading={ <TabHeading><Icon name="md-calendar" /></TabHeading>}>
            <Matches matches={this.state.matches} status={this.state.status} 
            betKey={betKey} groupKey={groupKey} onScore={this.onScore}/>
          </Tab>
          {groupKey.length===1 &&
            <Tab heading={ <TabHeading><Icon name="md-grid" /></TabHeading>}>
              <PositionTable positionTable={this.state.positionTable} />
            </Tab>
          }
        </Tabs>
        <FooterPhase position={this.props.position} groups={this.props.groups} 
        onPressButton={this.onPressButton}/>
      </Container>
    );
  }
}
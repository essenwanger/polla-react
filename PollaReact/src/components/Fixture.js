import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Content } from 'native-base';
import Phase from './Phase';
import firebase from 'react-native-firebase';

export default class Fixture extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
      groups: []
    };
  }

  onPressPhase(group){
    Actions.phase({user: this.state.user, groups: this.state.groups, group: group});
  }

  componentWillMount() {
    var userID= this.state.user.userID;
    var groups=[];
    firebase.database().ref('users/'+userID+'/').once('value').then((snapshot)=>{
      snapshot.val().bets[0].matches.forEach(function(value, key) {
        if(groups[value.group]==null){
          groups[value.group]={matches:[], positionTable: []};
        }
        groups[value.group].matches[value.id]=value;
      });
      Object.keys(snapshot.val().bets[0].positionTable).forEach(function(value, key) {
        if(groups[value]==null){
          groups[value]={matches:[], positionTable: []};
        }
        groups[value].positionTable=snapshot.val().bets[0].positionTable[value];
      });
      this.setState({
        groups: groups
      });
    });
  }

  render() {
    var items=Object.keys(this.state.groups).map((item, key) => (
      <Phase key={item} name={'Grupo '+item} percentage={'0%'} onPressPhase={()=> this.onPressPhase(item)} />
    ));
    return (
        <Content padder>
          {items}
        </Content>
    );
  }
}

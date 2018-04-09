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
      status: props.status,
      groups: []
    };
  }

  onPressPhase(group){
    Actions.phase({user: this.state.user, group: group, status: this.state.status});
  }

  componentWillMount() {
    var userID= this.state.user.userID;
    var groups=[];
    firebase.database().ref('users/'+userID+'/').once('value').then((snapshot)=>{
    //firebase.database().ref('users/'+userID+'/').on('value', function(snapshot) {
      snapshot.val().bets[0].matches.forEach(function(value, key) {
        if(groups[value.group]==null){
          groups[value.group]={name: 'Grupo '+value.group, total:0, complete:0, percentage: '0%'};
        }
        groups[value.group].total=groups[value.group].total+2;
        if(value.scoreTeam1!==''){
          groups[value.group].complete=groups[value.group].complete+1;
        }
        if(value.scoreTeam2!==''){
          groups[value.group].complete=groups[value.group].complete+1;
        }
        var percentage=groups[value.group].complete/groups[value.group].total;
        percentage=Math.round(percentage * 10000) / 100
        groups[value.group].percentage=percentage+'%';
      });
      this.setState({
        groups: groups
      });
    });
  }

  render() {
    var groups=this.state.groups;
    var items=Object.keys(groups).map((key, position) => (
      <Phase key={key} name={groups[key].name} percentage={groups[key].percentage} 
      onPressPhase={()=> this.onPressPhase(key)} />
    ));
    return (
        <Content padder>
          {items}
        </Content>
    );
  }
}

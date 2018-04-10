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
      groups: [],
      navigateGroups: []
    };
  }

  onPressPhase(position, group, name, order){
    Actions.phase({user: this.state.user, group: group, status: this.state.status, 
      groupName: name, order: order, navigateGroups: this.state.navigateGroups,
      position: position});
  }

  componentWillMount() {
    var userID= this.state.user.userID;
    var groups=[];
    var navigateGroups=[];
    firebase.database().ref('users/'+userID+'/').once('value').then((snapshot)=>{
      snapshot.val().bets[0].matches.forEach(function(value, key) {
        var groupName='';
        var group='';
        var order='';
        if(value.group===''){
          groupName=value.round;
          group=value.round;
          order='round';
        }else{
          groupName='Grupo '+value.group;
          group=value.group;
          order='group';
        }
        if(groups[group]==null){
          groups[group]={name: groupName, total:0, complete:0, percentage: '0%', order: order};
          navigateGroups.push({group, groupName, order});
        }
        groups[group].total=groups[group].total+2;
        if(value.scoreTeam1!==''){
          groups[group].complete=groups[group].complete+1;
        }
        if(value.scoreTeam2!==''){
          groups[group].complete=groups[group].complete+1;
        }
        var percentage=groups[group].complete/groups[group].total;
        percentage=Math.round(percentage * 10000) / 100
        groups[group].percentage=percentage+'%';
      });
      this.setState({
        groups: groups,
        navigateGroups: navigateGroups
      });
    });
  }

  render() {
    var groups=this.state.groups;
    var items=Object.keys(groups).map((key, position) => (
      <Phase key={key} name={groups[key].name} percentage={groups[key].percentage} 
      onPressPhase={()=> this.onPressPhase(position, key, groups[key].name, groups[key].order)} />
    ));
    return (
        <Content padder>
          {items}
        </Content>
    );
  }
}

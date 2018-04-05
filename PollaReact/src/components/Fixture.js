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
      snapshot.val().bets[0].forEach(function(value, key) {
        if(groups[value.group]==null){
          groups[value.group]=[];
        }
        groups[value.group][value.id]=value;
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

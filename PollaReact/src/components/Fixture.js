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
      group: []
    };
  }

  onPressPhase(){
    Actions.phase();
  }

  componentWillMount() {
    var userCode= this.state.user.email;
    userCode=userCode.replace(/\./g,'_');
    userCode=userCode.replace('@','_');
    var group=[];
    firebase.database().ref('users/'+userCode+'/').once('value').then((snapshot)=>{
      console.info(snapshot.val());
      snapshot.val().bets[0].forEach(function(value, key) {
        if(group[value.group]==null){
          group[value.group]=[];
        }
        group[value.group].push(value);
      });
      this.setState({
        group: group
      });
      //console.log(group);

      /*snapshot
      var group=[];
      snapshot.forEach(function(childSnapshot) {
        var item = childSnapshot.val();
        item.key = childSnapshot.key;
        ranking.push(item);
      });
      this.setState({
        ranking: ranking
      });*/
    });
  }

  render() {
    
    return (
        <Content padder>
          <Phase name={'Grupo A'} percentage={'10%'} onPressPhase={this.onPressPhase} />
          <Phase name={'Grupo B'} percentage={'10%'} onPressPhase={this.onPressPhase} />
          <Phase name={'Grupo C'} percentage={'10%'} onPressPhase={this.onPressPhase} />
          <Phase name={'Grupo D'} percentage={'10%'} onPressPhase={this.onPressPhase} />
          <Phase name={'Grupo E'} percentage={'10%'} onPressPhase={this.onPressPhase} />
          <Phase name={'Grupo F'} percentage={'10%'} onPressPhase={this.onPressPhase} />
          <Phase name={'Grupo G'} percentage={'10%'} onPressPhase={this.onPressPhase} />
          <Phase name={'Grupo H'} percentage={'10%'} onPressPhase={this.onPressPhase} />
        </Content>
    );
  }
}
import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Content, Spinner } from 'native-base';
import Phase from './Phase';
import firebase from 'react-native-firebase';

export default class Fixture extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
      status: props.status,
      bet: props.bet,
      groups: []
    };
  }

  onPressPhase(position){
    Actions.phase({user: this.state.user, status: this.state.status, 
      groups: this.state.groups, bet: this.state.bet, position: position});
  }

  componentWillMount() {
    this.dataFirebase();
  }

  componentWillReceiveProps(nextProps) {
    this.dataFirebase();
  }

  dataFirebase(){
    var betKey= this.state.bet;
    firebase.database().ref('preBetsAll/'+betKey+'/groups/').once('value').then((snapshot)=>{
      var groups=[];
      snapshot.forEach((childSnapshot)=>{
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();
        childData.key=childKey;
        groups.push(childData);
      });
      this.setState({
        groups: groups
      });
    });
  }

  render() {
    var groups=this.state.groups;
    var items=null;
    if(groups.length===0){
      items=<Spinner color='#000' ></Spinner>;
    }else{
      items=groups.map((item, key) => (
        <Phase key={key} name={item.group.length===1 ? ('Grupo '+item.group) : (item.group)} 
        percentage={item.percentage+'%'} 
        onPressPhase={()=> this.onPressPhase(key)} />
      ));
    }
    return (
        <Content padder>
          {items}
        </Content>
    );
  }
}

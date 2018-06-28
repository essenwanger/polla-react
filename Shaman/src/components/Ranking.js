import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Content, Text, Body, List, ListItem, Thumbnail, Left, Right } from 'native-base';
import firebase from 'react-native-firebase';

export default class Ranking extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
      listItems : []
    };
  }

componentDidMount() {
    if(this.props.status === 'opened'){
      firebase.database().ref('subscribed'+this.props.suffix+'/').once('value').then((snapshot)=>{
        var suscribeds=[];
        snapshot.forEach(function(childSnapshot) {
          var item = childSnapshot.val();
          item.key = childSnapshot.key;
          suscribeds.push({
            profile : item.profile,
            amount  : item.count
          });
        });
        this.setState({
          listItems: suscribeds
        });
      });
    }else{
      firebase.database().ref('ranking'+this.props.suffix+'/').orderByChild("totalPoints").once('value').then((snapshot)=>{
        var ranking=[];
        snapshot.forEach(function(childSnapshot) {
          var item = childSnapshot.val();
          item.key = childSnapshot.key;
          ranking.unshift({
            profile : item.profile,
            amount  : item.totalPoints,
            bet : item.key
          });
        });
        this.setState({
          listItems: ranking
        });
      });
    }
  }

  onPressUser(user, betKey){
    Actions.dashRank({userRank: user, bet: betKey, userBet: this.props.userBet});
  }
  
  render() {
    var items=null;
    if(this.props.status === 'opened'){
      items=this.state.listItems.map((item, key) => (
        <ListItem avatar key={key}>
          <Left>
            <Thumbnail small source={{uri: item.profile.picture}} />
          </Left>
          <Body>
            <Text>{item.profile.givenName}</Text>
          </Body>
          <Right>
            <Text>{item.amount}</Text>
          </Right>
        </ListItem>
      ));
    }else{
      items=this.state.listItems.map((item, key) => (
        <ListItem avatar key={key} onPress={()=>this.onPressUser(item.profile, item.bet)}>
          <Left>
            <Thumbnail small source={{uri: item.profile.picture}} />
          </Left>
          <Body>
            <Text>{item.profile.givenName}</Text>
          </Body>
          <Right>
            <Text>{item.amount}</Text>
          </Right>
        </ListItem>
      ));
    }
    return (
        <Content>
          <List>
            {items}
          </List>
        </Content>
    );
  }

}
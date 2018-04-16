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
      ranking : []
    };
  }

  componentDidMount() {
    firebase.database().ref('ranking/').once('value').then((snapshot)=>{
      var ranking=[];
      snapshot.forEach(function(childSnapshot) {
        var item = childSnapshot.val();
        item.key = childSnapshot.key;
        ranking.push(item);
      });
      this.setState({
        ranking: ranking
      });
    });
  }

  onPressUser(user){
    Actions.dashRank({userRank: user});
  }
  
  render() {
    var items=this.state.ranking.map((item, key) => (
      <ListItem avatar key={key} onPress={()=>this.onPressUser(item.profile)}>
        <Left>
          <Thumbnail small source={{uri: item.profile.picture}} />
        </Left>
        <Body>
          <Text>{item.profile.givenName}</Text>
        </Body>
        <Right>
          <Text>{item.points}</Text>
        </Right>
      </ListItem>
    ));
    return (
        <Content>
          <List>
            {items}
          </List>
        </Content>
    );
  }

}
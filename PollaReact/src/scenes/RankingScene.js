import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Content, Card, CardItem, Text, Body, H3, Button,
List, ListItem, Left, Right } from 'native-base';

export default class RankingScene extends Component {

  onPressLogin(){
    //Actions.pop();
  }

  render() {
    return (
      <Container>
      	<Header />
        <Content>
          <List>
            <ListItem avatar>
              <Left>
                <Text note>Foto</Text>
              </Left>
              <Body>
                <Text>Miguel Melgar</Text>
              </Body>
              <Right>
                <Text>1</Text>
              </Right>
            </ListItem>
            <ListItem avatar>
              <Left>
                <Text note>Foto</Text>
              </Left>
              <Body>
                <Text>Victor Lopez</Text>
              </Body>
              <Right>
                <Text>2</Text>
              </Right>
            </ListItem>
            <ListItem avatar>
              <Left>
                <Text note>Foto</Text>
              </Left>
              <Body>
                <Text>Carlos Montes de Oca</Text>
              </Body>
              <Right>
                <Text>3</Text>
              </Right>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}
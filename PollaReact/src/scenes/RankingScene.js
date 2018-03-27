import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Content, Text, Body, List, ListItem, Left, Right } from 'native-base';
import ContainerMenu from './../components/ContainerMenu';

export default class RankingScene extends Component {

  render() {
    return (
      <ContainerMenu name={'Polla'}>
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
      </ContainerMenu>
    );
  }
}
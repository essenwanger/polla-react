import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Content, Card, CardItem, Text, Body, Left, Button, Thumbnail, Title, Right } from 'native-base';

export default class AboutScene extends Component {

  constructor(props) {
    super(props);
    this.onClose = this.onClose.bind(this);
  }

  onClose(){
    Actions.pop();
  }

  render() {
    return (
      <Container>
        <Header>
          <Left/>
          <Body>
            <Title>Bizantinos</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Card>
          <CardItem>
              <Left>
                <Thumbnail source={require('../img/about/victor_lopez.png')} />
                <Body>
                  <Text>Victor Lopez</Text>
                  <Text note>@essenwanger</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Left>
                <Thumbnail source={require('../img/about/no_photo.jpeg')} />
                <Body>
                  <Text>Carlos Montes de Oca</Text>
                  <Text note>@carlos_gnu</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Left>
                <Thumbnail source={require('../img/about/edison_perez.png')} />
                <Body>
                  <Text>Edison Perez</Text>
                  <Text note>@edisonaqp</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Left>
                <Thumbnail source={require('../img/about/miguel_melgar.jpg')} />
                <Body>
                  <Text>Miguel Melgar</Text>
                  <Text note>@miguelhpm</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Left>
                <Thumbnail source={require('../img/about/no_photo.jpeg')} />
                <Body>
                  <Text>Carlos Sosa</Text>
                  <Text note>@carlos</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Left>
                <Thumbnail source={require('../img/about/no_photo.jpeg')} />
                <Body>
                  <Text>Alex Cusihuaman</Text>
                  <Text note>@alex</Text>
                </Body>
              </Left>
            </CardItem>
         </Card>
         <Button block onPress={this.onClose}>
            <Text>Cerrar</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
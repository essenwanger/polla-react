import React, { Component } from 'react';
import { StyleSheet , Linking } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Content, Card, CardItem, Text, Body, Left, Button, Thumbnail, Title, Right } from 'native-base';
import HeaderPolla from '../components/HeaderPolla';

export default class AboutScene extends Component {

  constructor(props) {
    super(props);
    this.onClose = this.onClose.bind(this);
  }

  onClose(){
    Actions.pop();
  }

  openUrl(url){
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Don't know how to open URI: " + url);
      }
    });
  }

  render() {
    return (
      <Container>
        <HeaderPolla pop={true} name='Bizantinos' />
        <Content>
          <Card>
          <CardItem button onPress={()=>this.openUrl('https://twitter.com/essenwanger')}>
              <Left>
                <Thumbnail source={require('../img/about/victor_lopez.png')} />
                <Body>
                  <Text>Victor Lopez</Text>
                  <Text note>@essenwanger</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem button onPress={()=>this.openUrl('https://twitter.com/carlos_gnu')}>
              <Left>
                <Thumbnail source={require('../img/about/no_photo.jpeg')} />
                <Body>
                  <Text>Carlos Montes de Oca</Text>
                  <Text note>@carlos_gnu</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem button onPress={()=>this.openUrl('https://twitter.com/edisonaqp')}>
              <Left>
                <Thumbnail source={require('../img/about/edison_perez.png')} />
                <Body>
                  <Text>Edison Perez</Text>
                  <Text note>@edisonaqp</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem button onPress={()=>this.openUrl('https://twitter.com/miguelhpm')}>
              <Left>
                <Thumbnail source={require('../img/about/miguel_melgar.jpg')} />
                <Body>
                  <Text>Miguel Melgar</Text>
                  <Text note>@miguelhpm</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem button onPress={()=>this.openUrl('https://twitter.com/lysbon')}>
              <Left>
                <Thumbnail source={require('../img/about/no_photo.jpeg')} />
                <Body>
                  <Text>Carlos Sosa</Text>
                  <Text note>@lysbon</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem button onPress={()=>this.openUrl('https://twitter.com/alex')}>
              <Left>
                <Thumbnail source={require('../img/about/no_photo.jpeg')} />
                <Body>
                  <Text>Alex Cusihuaman</Text>
                  <Text note>@alex</Text>
                </Body>
              </Left>
            </CardItem>
         </Card>
        </Content>
      </Container>
    );
  }
}
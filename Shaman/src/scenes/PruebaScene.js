import React, { Component } from 'react';
import { Container, Header, Title, Content, Footer, FooterTab, Button, 
  Left, Right, Body, Icon, Text, Card, CardItem, Thumbnail } from 'native-base';
import {Platform, View} from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center'
  },
  footer: {
    height: Platform.OS === 'ios' ? 280 : 300
  },
  foo: {
    height: 0,
    backgroundColor: 'white'
  }
}

export default class Prueba extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false
    }
    this.flag = require('../img/flags/rus.png');
  }

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title>Header</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Text>
            This is Content Section
          </Text>
        </Content>
        <Footer>
          <FooterTab>
            <Button onPress={()=> this.setState({visible: !this.state.visible})}>
              <Text>Tabla de Posiciones</Text>
            </Button>
          </FooterTab>
        </Footer>
        <Footer style={[styles.foo, this.state.visible && styles.footer]}>
          <Card>
            <CardItem bordered>
              <Left>
                <Body>
                  <Text>Equipos</Text>
                </Body>
              </Left>
              <Right>
                <Grid>
                  <Col style={{ alignItems: 'flex-end', justifyContent: 'center'}}>
                    <Text>MP</Text>
                  </Col>
                  <Col style={{ alignItems: 'flex-end', justifyContent: 'center'}}>
                    <Text>GF</Text>
                  </Col>
                  <Col style={{ alignItems: 'flex-end', justifyContent: 'center'}}>
                    <Text>GA</Text>
                  </Col>
                  <Col style={{ alignItems: 'flex-end', justifyContent: 'center'}}>
                    <Text>PT</Text>
                  </Col>
                </Grid>
              </Right>
            </CardItem>
            <CardItem>
              <Left>
                <Thumbnail small source={this.flag} 
                  style={{ borderColor: '#000000', borderWidth: 0.2}}/>
                <Body>
                  <Text>Rusia</Text>
                </Body>
              </Left>
              <Right>
                <Grid>
                  <Col style={{ alignItems: 'flex-end', justifyContent: 'center'}}>
                    <Text>10</Text>
                  </Col>
                  <Col style={{ alignItems: 'flex-end', justifyContent: 'center'}}>
                    <Text>10</Text>
                  </Col>
                  <Col style={{ alignItems: 'flex-end', justifyContent: 'center'}}>
                    <Text>10</Text>
                  </Col>
                  <Col style={{ alignItems: 'flex-end', justifyContent: 'center'}}>
                    <Text>10</Text>
                  </Col>
                </Grid>
              </Right>
            </CardItem>
            <CardItem>
              <Left>
                <Thumbnail small source={this.flag} 
                  style={{ borderColor: '#000000', borderWidth: 0.2}}/>
                <Body>
                  <Text>Rusia</Text>
                </Body>
              </Left>
              <Right>
                <Grid>
                  <Col style={{ alignItems: 'flex-end', justifyContent: 'center'}}>
                    <Text>10</Text>
                  </Col>
                  <Col style={{ alignItems: 'flex-end', justifyContent: 'center'}}>
                    <Text>10</Text>
                  </Col>
                  <Col style={{ alignItems: 'flex-end', justifyContent: 'center'}}>
                    <Text>10</Text>
                  </Col>
                  <Col style={{ alignItems: 'flex-end', justifyContent: 'center'}}>
                    <Text>10</Text>
                  </Col>
                </Grid>
              </Right>
            </CardItem>
            <CardItem>
              <Left>
                <Thumbnail small source={this.flag} 
                  style={{ borderColor: '#000000', borderWidth: 0.2}}/>
                <Body>
                  <Text>Rusia</Text>
                </Body>
              </Left>
              <Right>
                <Grid>
                  <Col style={{ alignItems: 'flex-end', justifyContent: 'center'}}>
                    <Text>10</Text>
                  </Col>
                  <Col style={{ alignItems: 'flex-end', justifyContent: 'center'}}>
                    <Text>10</Text>
                  </Col>
                  <Col style={{ alignItems: 'flex-end', justifyContent: 'center'}}>
                    <Text>10</Text>
                  </Col>
                  <Col style={{ alignItems: 'flex-end', justifyContent: 'center'}}>
                    <Text>10</Text>
                  </Col>
                </Grid>
              </Right>
            </CardItem>
            <CardItem>
              <Left>
                <Thumbnail small source={this.flag} 
                  style={{ borderColor: '#000000', borderWidth: 0.2}}/>
                <Body>
                  <Text>Rusia</Text>
                </Body>
              </Left>
              <Right>
                <Grid>
                  <Col style={{ alignItems: 'flex-end', justifyContent: 'center'}}>
                    <Text>10</Text>
                  </Col>
                  <Col style={{ alignItems: 'flex-end', justifyContent: 'center'}}>
                    <Text>10</Text>
                  </Col>
                  <Col style={{ alignItems: 'flex-end', justifyContent: 'center'}}>
                    <Text>10</Text>
                  </Col>
                  <Col style={{ alignItems: 'flex-end', justifyContent: 'center'}}>
                    <Text>10</Text>
                  </Col>
                </Grid>
              </Right>
            </CardItem>
          </Card>
        </Footer>
      </Container>
    );
  }
}
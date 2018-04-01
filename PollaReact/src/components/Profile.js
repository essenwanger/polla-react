import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Content, Thumbnail, Card, CardItem, Icon, Text, Button } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import firebase from 'react-native-firebase';

export default class Profile extends Component {

  constructor() {
    super();
  }

  onPressPhase(){
  }

  componentDidMount() {

  }

  render() {
    return (
        <Content padder>
          <Grid>
            <Col style={{ alignItems: 'center', height: 240, justifyContent: 'center' }}>
              <Thumbnail large source={require('../img/flags/rus.png')} 
              style={{ borderColor: '#000000', borderWidth: 0.2}}/>
              <Text>Victor</Text>
            </Col>
          </Grid>
          {/* 
            <Grid>
              <Col>
                <Button info block transparent><Icon name='md-information-circle'/><Text>Acerca de #</Text></Button>
              </Col>
              <Col>
                <Button danger block transparent><Icon name='md-close-circle'/><Text>Cerrar Sesion</Text></Button>
              </Col>
            </Grid>
          */}
          <Card>
            <CardItem bordered>
              <Button info block transparent small><Icon name='md-information-circle'/><Text>Acerca de #</Text></Button>
            </CardItem>
            <CardItem>
              <Button danger block transparent small><Icon name='md-close-circle'/><Text>Cerrar Sesion</Text></Button>
            </CardItem>
          </Card>
        </Content>
    );
  }
}
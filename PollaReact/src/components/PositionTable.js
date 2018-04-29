import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Content, Spinner, Card, CardItem, Left, Body, Text, Right } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import PositionTableTeam from './PositionTableTeam';

export default class PositionTable extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    var positionTableComponent=positionTableComponent=this.props.positionTable.map((item, key) => (
      <PositionTableTeam key={item.team} team={item.team} name={item.teamName} 
      mp={item.played} gf={item.goalsFor} 
      ga={item.goalsAgainst} pt={item.points} />
    ));
    return (
      <Content padder>
        {this.props.positionTable.length===0 ?
          (<Spinner color='#000' ></Spinner>)
          :
          (<Card>
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
          {positionTableComponent}
        </Card>)
        }
      </Content>
    );
  }
}
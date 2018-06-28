import React, { Component } from 'react';
import { Container, Icon, Content, Card, CardItem, 
  Body, Text, Thumbnail, Header, Left, Button, Title, Right } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Flag } from './Helpers';

export default class LiveScoreMatch extends Component {

  constructor(props) {
    super(props);
    this.teamFlag1 = Flag(this.props.data.team1);
    this.teamFlag2 = Flag(this.props.data.team2);
  }

  render() {
    return (
      <Card>
        <CardItem>
          <Grid>
            <Row>
              <Col>
                <Body style={{ marginBottom: 10 , alignItems: 'center'}}>
                  <Text note style={{ textAlign: 'center'}}>Live Score</Text>
                </Body>
              </Col>
            </Row>
            <Row>
              <Col style={{flexDirection: 'row'}} size={30}>
                <Thumbnail source={this.teamFlag1} 
                style={{ borderColor: '#000000', borderWidth: 0.2}}/>
                <Body style={{justifyContent: 'flex-start', marginLeft: 10, marginTop: 10}}>
                  <Text>{this.props.data.teamName1}</Text>
                </Body>
              </Col>
              <Col size={10}>
                <Body style={{justifyContent: 'center'}}>
                  <Text>{this.props.data.scoreTeam1}</Text>
                  <Text>{this.props.data.scorePenaltyTeam1}</Text>
                </Body>
              </Col>
              <Col style={{alignItems: 'flex-end'}} size={10}>
                <Body style={{justifyContent: 'center', alignItems: 'flex-end'}}>
                  <Text>{this.props.data.scoreTeam2}</Text>
                  <Text>{this.props.data.scorePenaltyTeam2}</Text>
                </Body>
              </Col>
              <Col style={{flexDirection: 'row'}} size={30}>
                <Body style={{justifyContent: 'flex-start', alignItems: 'flex-end', marginRight: 10, marginTop: 10}}>
                  <Text>{this.props.data.teamName2}</Text>
                </Body>
                <Thumbnail source={this.teamFlag2} 
                style={{ borderColor: '#000000', borderWidth: 0.2}}/>
              </Col>
            </Row>
            <Row>
              <Col>
                <Body style={{ marginBottom: 10 , alignItems: 'center'}}>
                  <Text note style={{ textAlign: 'center'}}>{this.props.data.matchTime}</Text>
                </Body>
              </Col>
            </Row>
          </Grid>
        </CardItem>
      </Card>
    );
  }
}
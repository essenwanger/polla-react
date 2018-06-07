import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Container, Tabs, Tab, TabHeading, Icon, Content, Text, ScrollableTab, 
  Footer, FooterTab, Button, Card, CardItem, Left, Right, Body, Thumbnail } from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
import {Platform} from 'react-native';
import HeaderPolla from './../components/HeaderPolla';
import PhaseGroup from './../components/PhaseGroup';
import firebase from 'react-native-firebase';

export default class PhaseScene2 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      status: props.status,
      bet: props.bet,
      groups: props.groups
    };
  }

  componentDidMount(){
    setTimeout(()=>{
      this.setState({activePage:this.props.position})
    },0);
  }

  render() {
    var items=null;
    items=this.state.groups.map((item, key) => (
      <Tab key={key} heading={item.group.length===1 ? ('Grupo '+item.group) : (item.group)}>
        <PhaseGroup status={this.state.status} bet={this.state.bet} 
        group={item.group} position={key} user={this.props.user}/>
      </Tab>
    ));
    return (
      <Container>
        <HeaderPolla pop name={"Fixture"} user={this.props.user} />
        <Tabs initialPage={this.state.activePage} renderTabBar={()=> <ScrollableTab />}>
          {items}
        </Tabs>
      </Container>
    );
  }
}
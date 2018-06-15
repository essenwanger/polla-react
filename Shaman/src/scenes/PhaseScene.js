import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Container, Tabs, Tab, TabHeading, Icon, Content, Text, ScrollableTab, 
  Footer, FooterTab, Button, Card, CardItem, Left, Right, Body, Thumbnail } from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
import {Platform, StyleSheet} from 'react-native';
import HeaderPolla from './../components/HeaderPolla';
import PhaseGroup from './../components/PhaseGroup';
import firebase from 'react-native-firebase';

const styles = StyleSheet.create({
  tab: {
  },
  tabAndroid: {
    backgroundColor: '#06BA41'
  }
});

export default class PhaseScene extends Component {

  constructor(props) {
    super(props);
    this.state = {
      status: props.status,
      bet: props.bet,
      groups: props.groups
    };
  }

  componentDidMount(){
    if(Platform.OS === 'ios'){
      this.setState({activePage:this.props.position});
    }else{
      setTimeout(()=>{
        this.setState({activePage:this.props.position})
      },0);
    }
  }

  updateData(i){
  }

  render() {
    var items=null;
    items=this.state.groups.map((item, key) => (
      <Tab key={key} heading={item.group.length===1 ? ('Grupo '+item.group) : (item.group)}
       style={{backgroundColor: "transparent"}}>
        <PhaseGroup status={this.state.status} bet={this.state.bet} 
        group={item.group} position={key} user={this.props.user}/>
      </Tab>
    ));
    return (
      <Container>
        <HeaderPolla pop name={"Fixture"} user={this.props.user} />
        <Tabs initialPage={this.state.activePage} page={this.state.activePage} 
        renderTabBar={()=> <ScrollableTab style={[styles.tab, Platform.OS !== 'ios' && styles.tabAndroid]} />}
        onChangeTab={({ i, ref, from })=> this.updateData(i)}>
          {items}
        </Tabs>
      </Container>
    );
  }
}
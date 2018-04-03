import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Content } from 'native-base';
import Phase from './Phase';
import firebase from 'react-native-firebase';

export default class Fixture extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: props.user
    };
  }

  onPressPhase(){
    Actions.phase();
  }

  componentDidMount() {

  }

  render() {
    return (
        <Content padder>
          <Phase name={'Grupo A'} percentage={'10%'} onPressPhase={this.onPressPhase} />
          <Phase name={'Grupo B'} percentage={'10%'} onPressPhase={this.onPressPhase} />
          <Phase name={'Grupo C'} percentage={'10%'} onPressPhase={this.onPressPhase} />
          <Phase name={'Grupo D'} percentage={'10%'} onPressPhase={this.onPressPhase} />
          <Phase name={'Grupo E'} percentage={'10%'} onPressPhase={this.onPressPhase} />
          <Phase name={'Grupo F'} percentage={'10%'} onPressPhase={this.onPressPhase} />
          <Phase name={'Grupo G'} percentage={'10%'} onPressPhase={this.onPressPhase} />
          <Phase name={'Grupo H'} percentage={'10%'} onPressPhase={this.onPressPhase} />
        </Content>
    );
  }
}
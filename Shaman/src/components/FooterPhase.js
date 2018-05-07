import React, { Component } from 'react';
import { Footer, FooterTab, Button, Text } from 'native-base';

export default class FooterPhase extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    var groups=this.props.groups;
    var positionLeft=this.props.position-1;
    var positionRight=this.props.position+1;
    var buttonLeft=<Button><Text></Text></Button>;
    var buttonRight=<Button><Text></Text></Button>;
    if(groups[positionLeft]!==undefined){
      var text=groups[positionLeft].group.length===1 ? 
      ('Grupo '+groups[positionLeft].group) : (groups[positionLeft].group);
      buttonLeft=<Button onPress={()=> this.props.onPressButton(positionLeft)}>
      <Text>{text}</Text></Button>;
    }
    if(groups[positionRight]!==undefined){
      var text=groups[positionRight].group.length===1 ? 
      ('Grupo '+groups[positionRight].group) : (groups[positionRight].group);
      buttonRight=<Button onPress={()=> this.props.onPressButton(positionRight)}>
      <Text>{text}</Text></Button>;
    }
    return (
      <Footer>
        <FooterTab>
          {buttonLeft}
          {buttonRight}
        </FooterTab>
      </Footer>
    );
  }
}
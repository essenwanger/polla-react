import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Content, Spinner } from 'native-base';
import firebase from 'react-native-firebase';
import HTMLView from 'react-native-htmlview';

export default class Term extends Component {

  constructor(props) {
    super(props);  
    this.state = {
      typeBet: null
    };
    console.log(props);     
  }

  componentWillMount() {    
    console.log(this.props.codeTypeBet);
    firebase.database().ref('typeBets/'+this.props.codeTypeBet).once('value').then((snapshot)=>{
      this.setState({typeBet: snapshot.val()});
    });
  }
  
  render() {
    return (
        <Content padder>
          { this.state.typeBet ? 
            ( 
              <HTMLView value={this.state.typeBet.descriptionRules} stylesheet={styles} />
            ):
            (
              <Spinner color='green'></Spinner>
            )
          }          
        </Content>
    );
  }
}

const styles = StyleSheet.create({  
  h1: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  h2: {
    fontSize: 5,
    fontWeight: 'bold'
  },
  p: {
    textAlign: 'justify'
  }
});
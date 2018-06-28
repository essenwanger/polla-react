import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { ImageBackground, Platform, Image } from 'react-native';
import { ListItem, Text, List, Content, Right, Left, Icon, Body} from 'native-base';
import firebase from 'react-native-firebase';
import GoogleSignIn from 'react-native-google-sign-in';

const routes = ["Todo el Mundial", "Octavos", "Cuartos", "Semifinal", "Final"];

export default class MenuSideBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      bets: props.user.bets,
      iconName: Platform.OS === 'ios' ? 'ios-arrow-forward' : 'md-arrow-dropright'
    };
    this.onPressLogout = this.onPressLogout.bind(this);
    this.onPressAbout = this.onPressAbout.bind(this);
    this.onPressAddBet = this.onPressAddBet.bind(this);
    this.onPressBet = this.onPressBet.bind(this);
  }

  onPressAbout(){
    Actions.about();
  }

  onPressLogout(){
    GoogleSignIn.signOut();
    Actions.reset('login');
  }

  onPressBet(bet) {
    console.log(bet);
  }

  onPressAddBet() {
    console.log("Add bet");
  }

  componentDidMount() {
    try {
      GoogleSignIn.configure({
        clientID: '776210840524-fmk9pos1c23kfnempoi2ntjshdsd9865.apps.googleusercontent.com',
        serverClientID: '776210840524-bolhuiog2030t59paeo9b9r03nhtqn1f.apps.googleusercontent.com'
      });
  
    } catch(err) {
      console.log("Play services error", err.code, err.message);
    }
  }

  render() {
    return (
      <Content  style={{backgroundColor: '#ffffff'}}>
        <ImageBackground 
                source={require('../img/background-drawer.jpg')}
                style={{
                height: 120,
                alignSelf: "stretch",
                justifyContent: "center",
                alignItems: "center"
                }}>
            <Image
                square
                style={{ height: 120, width: 120 }}
                source={require('../img/logo.png')}
                />
          </ImageBackground >
          <ListItem itemDivider>
            <Text>Mis apuestas</Text>
          </ListItem>
          <List
              dataArray={this.state.bets}
              renderRow={data => {
              return (
                  <ListItem button onPress={this.onPressBet} >
                    <Body>
                      <Text>{data.name}</Text>
                    </Body>
                    <Right>
                      <Icon name={this.state.iconName} />
                    </Right>                    
                  </ListItem>
              );
              }}
          />
          <ListItem button onPress={this.onPressAddBet} >
            <Body>
              <Text>Apostar</Text>
            </Body>
            <Right>
              <Icon name="md-add" />
            </Right>
          </ListItem>
          <ListItem itemDivider>
            <Text>Acerca de</Text>
          </ListItem>
          <ListItem button onPress={this.onPressAbout} >
            <Body>
              <Text>Nosotros</Text>
            </Body>
            <Right>
              <Icon name="md-ionitron" />
            </Right>
          </ListItem>
          <ListItem itemDivider>
            <Text>Sesión</Text>
          </ListItem>
          <ListItem button onPress={this.onPressLogout} >
            <Body>
              <Text>Cerrar sesión</Text>
            </Body>
            <Right>
              <Icon name="md-close-circle" />
            </Right>
          </ListItem>
      </Content>
      );
    }
  }
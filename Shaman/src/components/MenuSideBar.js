import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { ImageBackground , Image } from 'react-native';
import { ListItem, Text, List, Content, Left, Icon, Body} from 'native-base';
import firebase from 'react-native-firebase';
import GoogleSignIn from 'react-native-google-sign-in';

const routes = ["Todo el Mundial", "Octavos", "Cuartos", "Semifinal", "Final"];

export default class MenuSideBar extends Component {

  constructor(props) {
    super(props);
    this.onPressLogout = this.onPressLogout.bind(this);
    this.onPressAbout = this.onPressAbout.bind(this);
  }

  onPressAbout(){
    Actions.about();
  }

  onPressLogout(){
    GoogleSignIn.signOut();
    Actions.reset('login');
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
              dataArray={routes}
              renderRow={data => {
              return (
                  <ListItem button>
                    <Text>{data}</Text>
                  </ListItem>
              );
              }}
          />
          <ListItem button>
            <Text>Nueva Apuesta</Text>
          </ListItem>
          <ListItem itemDivider>
            <Text>Ayuda</Text>
          </ListItem>
          <ListItem button onPress={this.onPressAbout} >
            <Text>Nosotros</Text>
          </ListItem>
          <ListItem itemDivider>
            <Text>Sesión</Text>
          </ListItem>
          <ListItem button onPress={this.onPressLogout} >
            <Text>Cerrar sesión</Text>
          </ListItem>
      </Content>
      );
    }
  }
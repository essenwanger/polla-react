import React, { Component } from 'react';
import { ImageBackground , Image } from 'react-native';
import { ListItem, Text, List, Content, Left, Icon, Body} from 'native-base';

const routes = ["Todo el Mundial", "Octavos", "Final"];

export default class MenuSideBar extends Component {
//https://medium.com/@Laurens_Lang/react-native-migrating-from-react-native-router-flux-to-react-navigation-7c47b1cc679c
//http://docs.nativebase.io/docs/examples/navigation/StackNavigationExample.html
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
              <Text>Ajustes</Text>
            </ListItem>
            <ListItem button>
              <Text>Bizantinos</Text>
            </ListItem>
            <ListItem button>
              <Text>Cerrar sesión</Text>
            </ListItem>
        </Content>
      );
    }
  }
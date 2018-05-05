import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Drawer, Container, Header, Left, Button, Body, Icon, Title, Right, 
  List, ListItem, Content, Text } from 'native-base';

export default class ContainerMenu extends Component {

  constructor(props) {
    super(props);
  }

  onPressBack(){
    Actions.pop();
  }

  closeDrawer(){
    this._drawer._root.close()
  }
  openDrawer(){
    this._drawer._root.open()
  }

  render() {
    return (
      <Drawer
        ref={(ref) => { this._drawer = ref; }}
        content={<Menu/>}
        onClose={() => this.closeDrawer()} side={'right'} >
        <Container>
          <Header>
            <Left>
              <Button transparent onPress={this.onPressBack}>
                <Icon name='arrow-back' />
              </Button>
            </Left>
            <Body>
              <Title>{this.props.name}</Title>
            </Body>
            <Right>
              <Button transparent onPress={() => this.openDrawer()}>
                <Icon name='menu' />
              </Button>
            </Right>
          </Header>
          {this.props.children}
        </Container>
      </Drawer>
    );
  }
}

class Menu extends Component {

  onPressPerfil(){
    Actions.fixture();
  }

  onPressRanking(){
    Actions.ranking();
  }

  render() {
    return (
      <Content style={{backgroundColor: '#ffffff'}} >
        <List>
          <ListItem onPress={this.onPressPerfil}>
            <Text>Perfil</Text>
          </ListItem>
          <ListItem onPress={this.onPressRanking}>
            <Text>Ranking</Text>
          </ListItem>
        </List>
      </Content>
    );
  }
}
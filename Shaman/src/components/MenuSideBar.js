import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { ImageBackground, Platform, Image, BackHandler, Toast } from 'react-native';
import { View, ListItem, Text, Thumbnail, List, Content, Right, Left, Icon, Body} from 'native-base';
import firebase from 'react-native-firebase';
import GoogleSignIn from 'react-native-google-sign-in';

//tomar guia ranking
//Back (false hace el atras del disposituvo) HeaderPolla

export default class MenuSideBar extends Component {

  constructor(props) {
    super(props);
    delete props.user.bets["all"];
    this.state = {
      bets: props.user.bets,
      iconName: Platform.OS === 'ios' ? 'ios-arrow-forward' : 'md-arrow-dropright'
    };
    this.onPressLogout = this.onPressLogout.bind(this);
    this.onPressAbout = this.onPressAbout.bind(this);
    this.onPressAddBet = this.onPressAddBet.bind(this);
    this.onBackPress = this.onBackPress.bind(this);
  }

  onPressAbout(){
    this.props.closeDrawer();
    Actions.about();
  }

  onPressLogout(){
    GoogleSignIn.signOut();
    Actions.reset('login');
  }

  onPressBet(bet) {
    this.props.closeDrawer();
    Actions.dashboard({user: this.props.user, bet: bet});
  }

  onPressAddBet() {
    Actions.createBetScore({user: this.props.user, firstBet: false});
  }

  onBackPress () {
    this.props.closeDrawer();
    return true;
  }

  componentDidMount() {
    try {
      GoogleSignIn.configure({
        clientID: '776210840524-fmk9pos1c23kfnempoi2ntjshdsd9865.apps.googleusercontent.com',
        serverClientID: '776210840524-bolhuiog2030t59paeo9b9r03nhtqn1f.apps.googleusercontent.com'
      });
  
    } catch(err) {
      Toast.show({
        text: 'Error de conexión con Google',
        position: 'bottom',
        buttonText: 'Ok',
        type: 'danger'
      });
    }
    //BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  //componentWillUnmount () {
  //  BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  //}

  render() {
    return (
      <Content  style={{backgroundColor: '#ffffff'}}>
        <ImageBackground 
                source={require('../img/background-drawer.jpg')}
                style={{
                  height: 140,
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
          <ListItem icon itemDivider>
            <Left>
              <Thumbnail small source={{uri: this.props.user.profile.picture}}
                  style={{ borderColor: '#000000', borderWidth: 0.2}}/>
            </Left>
            <Body>
              <Text>{this.props.user.profile.givenName}</Text>
              <Text note >{this.props.user.profile.email}</Text>
            </Body>
          </ListItem>
          <ListItem itemDivider>
            <Text>Mis apuestas</Text>
          </ListItem>
          <List
              dataArray={this.state.bets}
              renderRow={data => {
              return (
                  <ListItem button onPress={()=>this.onPressBet(data)} >
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
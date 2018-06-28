import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Container, Content, Form, Item, Input, Picker, Header, Left, 
  Button, Icon, Body, Title, Right, Text, Toast, Root } from 'native-base';
import HeaderPolla from '../components/HeaderPolla';
import firebase from 'react-native-firebase';

export default class CreateBetScene extends Component {

  constructor(props) {
    super(props);
    this.state = {
      nameBet: '',
      selectedType: undefined,
      typeBets: [],
      firstBet: props.firstBet === undefined ? true : props.firstBet
    };
    this.onCreate = this.onCreate.bind(this);
  }

  onValueChange(value) {
    this.setState({
      selectedType: value
    });
  }

  onCreate() {
    if(this.state.nameBet==='' || this.state.selectedType===undefined){
      Toast.show({
        text: 'Datos no ingresados',
        position: 'bottom',
        buttonText: 'Ok',
        type: 'danger'
      });
    }else{
      var preBet = {
        profile: this.props.user.profile,
        type: this.state.selectedType.key
      };
      var refPreBets = firebase.database().ref('preBets' + this.state.selectedType.suffix);
      var refPrePush = refPreBets.push(preBet);
      firebase.database().ref('users/' + this.props.user.profile.userID + '/bets/').
      once('value').then((snapshot)=>{
        var con=0;
        if(snapshot.val()!==null){
          con=snapshot.val().length;
        }
        firebase.database().ref('users/' + this.props.user.profile.userID + '/bets/'+con).set({
          betKey: refPrePush.key,
          completed: false,
          name: this.state.nameBet,
          suffix: this.state.selectedType.suffix,
          type: this.state.selectedType.key
        });
        Actions.reset('liveScore', {user: this.props.user});
      });
    }
  }

  componentWillMount() {
    Toast.toastInstance = null;
  }

  componentWillUnmount() {
    Toast.toastInstance = null;
  }

  componentDidMount() {
    firebase.database().ref('typeBets/').once('value').then((snapshot)=>{
      var typeBets=[];
      snapshot.forEach((childSnapshot)=>{
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();
        if(childData.status===undefined || childData.status==='opened'){
          childData.key=childKey;
          typeBets.push(childData);
        }
      });
      this.setState({typeBets: typeBets});
    });
  }

  render() {
    var items=null;
    items=this.state.typeBets.map((item, key) => (
      <Picker.Item key={key} label={item.name} value={item} />
    ));
    var header=null;
    if (this.state.firstBet) {
      header = <HeaderPolla name={'Shaman'} />;
    } else {
      header = <HeaderPolla pop name={'Shaman'} />;
    }
    return (
      <Root>
        <Container>
          {header}
          <Content>
            <Form>
              <Item>
                <Input placeholder="Nombre Apuesta" 
                onChangeText={(nameBet) => this.setState({nameBet})} value={this.state.nameBet}/>
              </Item>
              <Item picker last>
                <Picker
                  renderHeader={backAction =>
                  <Header>
                    <Left>
                      <Button transparent onPress={backAction}>
                        <Icon name="arrow-back" style={{ color: "#fff" }} />
                      </Button>
                    </Left>
                    <Body>
                      <Title>Apuesta</Title>
                    </Body>
                    <Right/>
                  </Header>}
                  mode="dropdown"
                  placeholder="Selecciona tu tipo de Apuesta"
                  selectedValue={this.state.selectedType}
                  onValueChange={this.onValueChange.bind(this)}
                >
                  {items}
                </Picker>
              </Item>
            </Form>
            <Button block success style={{marginHorizontal: 10, marginTop: 20}} 
              onPress={this.onCreate}>
              <Text>Registrar</Text>
            </Button>
          </Content>
        </Container>
      </Root>
    );
  }
}
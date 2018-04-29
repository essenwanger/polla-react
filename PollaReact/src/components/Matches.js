import React, { Component } from 'react';
import { Content, Spinner, Card } from 'native-base';
import Match from './Match';

export default class Matches extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    var matchesComponent=this.props.matches.map((item, key) => (
      <Match key={item.id} data={item} status={this.props.status} onScore={this.props.onScore}/>
    ));
    return (
        <Content padder>
          {this.props.matches.length===0 ?
            (<Spinner color='#000' ></Spinner>)
            :
            (<Card>
              {matchesComponent}
            </Card>)
          }
        </Content>
    );
  }
}
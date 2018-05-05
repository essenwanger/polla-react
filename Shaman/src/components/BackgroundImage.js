import React, { Component } from 'react';
//import {
//  StyleSheet,
//  Text,
//  Image,
//  View
//} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, StyleSheet, Text, Image, View } from 'native-base';

export default class BackgroundImage extends Component {

    render() {
        return (
            <Container><View><Image source={require('../img/background.png')}
                  style={styles.backgroundImage}>

                  {this.props.children}

            </Image>
            </View>
            </Container>
        )
    }
}

class TextBackgroundImage extends Component {
    render() {
        return (
            <Container><View><BackgroundImage>
              <Text style={styles.text}>Fullscreen!</Text>
            </BackgroundImage></View>
            </Container>
        ) 
    }
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover'
    },

    text: {
        textAlign: 'center',
        color: 'white',
        backgroundColor: 'rgba(0,0,0,0)',
        fontSize: 32
    }
});
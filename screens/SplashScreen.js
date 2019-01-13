import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    Button,
    Alert,
    TouchableOpacity,
    TextInput,
    Switch,
    Image,
    FlatList
  } from 'react-native'
import firebase from '@firebase/app'
import '@firebase/auth'

export default class SplashScreen extends Component {
    constructor(props) {
        super(props);
        firebase.auth().onAuthStateChanged(() => {
            if (firebase.auth().currentUser != null) {
              if(firebase.auth().currentUser.emailVerified){
                this.props.navigation.navigate('TabNavigator', {})
              }else{
                this.props.navigation.navigate('Verify', {});
              }
            }else{
              this.props.navigation.navigate('Login', {})
            }
          })
    }
    render() {
        return (
            <View style={{justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%'}}>
                <Text>Loading...</Text>
            </View>
        )
    }
    }
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
import EStyleSheet from 'react-native-extended-stylesheet'
import firebase from '@firebase/app'
import '@firebase/auth'

export default class VerifyScreen extends Component {
    constructor(props) {
        super(props)
        if (!firebase.auth().currentUser.emailVerified){
            firebase.auth().currentUser.sendEmailVerification()
        }
    }
    checkVerifycation(){
        firebase.auth().currentUser.reload().then(() =>{
        if(!firebase.auth().currentUser.emailVerified){
            Alert.alert(
            'Please verify your email',
            '',
            [
              {text: 'Send email again', onPress: () => firebase.auth().currentUser.sendEmailVerification()},
              {text: 'OK'},
            ],
            )
        }else{
            Alert.alert("Your Verifycation is completed")
            this.props.navigation.navigate('TabNavigator', {})
        }
        })
    }
    deleteAcc(){
        var user = firebase.auth().currentUser
        Alert.alert(user.email)
        firebase.firestore().collection("user").doc(user.email).delete().then(() => {
            this.props.navigation.navigate('Login', {delete: true})
        })
        
    }
    render() {
        return (
            <View style={styles.verifyView}>
                    <View style={{flex: 0.3}}/>
                    <Text style={styles.verifyText}>Please verify your email</Text>
                    <Text style={styles.verifyText}>Check your mailbox to go on</Text>
                    <View style={{flex: 5}}/>
                    <TouchableOpacity style={styles.verifyButton} onPress={() => this.checkVerifycation()}/>
                    <Button title={"Delete account"} onPress={() => this.deleteAcc()}/>
                    <View style={{flex: 3}}/>
            </View>
        )
    }
    }
    const styles = EStyleSheet.create({
        verifyButton:{
            backgroundColor: 'blue',
            width: '80%',
            height: 50,
            flex: 1,
            borderRadius: 50
        },
        verifyText:{
            fontWeight: 'bold',
            fontSize: 30,
            color: 'white'
        },
        verifyView:{
            flex: 1,
            alignItems: 'center',
            flexDirection: 'column'
        }
    })
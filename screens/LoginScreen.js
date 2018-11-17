import React from 'react';
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
  SafeAreaView,
  ActivityIndicator,
  ImageBackground
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { StackNavigator } from 'react-navigation';
import * as firebase from 'firebase';
const util = require('util');

firebase.initializeApp({
  apiKey: "AIzaSyC1AsSlqbtMAFXEOjQamz-35ywlqRW-Vuc",
  authDomain: "react-native-firebase-3.firebaseapp.com",
  databaseURL: "https://react-native-firebase-3.firebaseio.com",
  projectId: "react-native-firebase-3",
  storageBucket: "react-native-firebase-3.appspot.com",
  messagingSenderId: "258088831368"
});

EStyleSheet.build({
  $textColor: 'white'
});


export default class loginScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  static navigationOptions = {
      title: '',
      header: null,
  };
  state = {
    email: '',
    password: '',
    error: '',
    loading: false,
    authenticated: false,
    isActive: true
  }
  componentWillMount(){
    firebase.auth().onAuthStateChanged((user) => {
      if(user != null){
        console.log(user)
      }
    })
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loading: false, authenticated: true });
        Alert.alert("no HI")
      } else {
        this.setState({ loading: false, authenticated: false });
        Alert.alert("HI")
      }
    });
  }
  onPressLogin(){
    this.setState({error: '', loading: true});
    const{email, password} = this.state;
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
      this.props.navigation.navigate('Second', {});
      this.setState({error:'', loading: false});
    })
    .catch(() => {
      this.setState({error: 'Authentication failed', loading: false});
    })
  }
  onPressSignUp(){
    this.setState({error: '', loading: true});
    const{email, password} = this.state;
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(() => {
      this.props.navigation.navigate('Second', {});
      this.setState({error:'', loading: false});
    })
    .catch(function(error) {
      //this.setState({error: 'Authentication failed', loading: false});
      var errorCode = error.code;
      switch(error.code) {
        case 'auth/email-already-in-use':
          Alert.alert("Email already in use");
           break;
      }
    })
  }
  renderCurrentState() {
    if (this.state.authenticating){
      return (
        <View>
          <ActivityIndicator size='large'/>
        </View>
      )
    }else if (this.state.authenticated) {
      this.props.navigation.navigate('Second', {});
    }else{
    return (
      <ImageBackground blurRadius={5} source={require("../assets/background_1.jpg")} style={styles.container}>
      <View style={styles.loginTextView}><Text style={styles.loginText} >Thats the first line of text!</Text></View>
      <View style={{flex: 3.5, width: '100%', alignItems: 'center'}}>
        <View style={styles.loginView}>
        <View style={{width: '100%', height: 8, backgroundColor: 'red',}}></View>
        <Text style={styles.loginViewText}>LOGIN</Text>
        <View style={{top: '35%',}} >
          <TextInput style={styles.emailfield} underlineColorAndroid="transparent" placeholder="E-mail" onChangeText={email => this.setState({ email })} value={this.state.email}/>
          <TextInput style={styles.passwordfield} underlineColorAndroid="transparent" secureTextEntry={true} placeholder="Passwort" onChangeText={password => this.setState({ password })} value={this.state.password}/>
        </View>
        <View style={styles.rememberView} >
          <Switch style={styles.switch} value={this.state.isActive} onValueChange={(val) => this.setState({isActive: val})}/>
          <Text style={styles.rememberMe}>Remember me</Text>
        </View>
        </View>
        <View style={styles.ButtonView} pointerEvents='box-none'>
          <TouchableOpacity
            style={styles.loginScreenButton}
            //onPress={() => navigate('Second', {})}
            onPress={() => this.onPressLogin()}>
            <Image style={{width: 80, height: 80, }} source={require("../assets/LoginButton.png")}/>
          </TouchableOpacity>
       </View>
      </View>
        <View style={styles.container2}><View style={[styles.otherButtons, {backgroundColor: 'black'}]}>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('SocialMedia', {})} style={{width: '100%', height: '100%', alignItems: 'center',justifyContent: 'center',}}><Text style={{color: 'white',}}>Login with socialmedia</Text></TouchableOpacity></View></View>
        <View style={[styles.container2, {justifyContent: 'flex-start'}]}><ImageBackground onPress={() => this.onPressSignUp()} imageStyle={{ borderRadius: 25 }} source={require("../assets/Gradient_1.png")} style={styles.otherButtons}>
        <TouchableOpacity onPress={() => this.onPressSignUp()} style={{width: '100%', height: '100%', alignItems: 'center',justifyContent: 'center',}}><Text style={{color: 'white',}}>Sign in</Text></TouchableOpacity>
        </ImageBackground></View>
        </ImageBackground>
    )
  }
}

  render() {
      var {navigate} = this.props.navigation;
    return (
      <View>
        {this.renderCurrentState()}
      </View>
    );
  }
}
const styles = EStyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    backgroundColor: 'white',
    alignItems:'center',
  },
  loginScreenButton:{
    position: 'absolute',
    right: '5%',
    top: -40,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.1,
    shadowRadius: 18,
    elevation: 20,
  },
  loginText:{
    textAlign:'center',
    width: 350,
    fontSize: 36,
    position: 'absolute',
    color: 'white',
  },
  passwordfield:{
    width: 200,
    fontSize: 18,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    marginTop: 30,
  },
  emailfield:{
    width: 200,
    fontSize: 18,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },
  loginView:{
    flex: 3,
    width: '85%',
    //minHeight: 250,
    backgroundColor: 'white',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.1,
    shadowRadius: 18,
    elevation: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  ButtonView:{
    flex: 0.5,
    width: '85%',
    alignItems: 'center',
  },
  loginViewText:{
    fontSize: 30,
    left: '8%',
    top: '8%',
    position: 'absolute',
    fontWeight: 'bold',
  },
  rememberMe:{
    position: 'absolute',
    left: '20%',
  },
  switch:{
    left: '-5%',
    position: 'absolute',
  },
  rememberView:{
    width: '85%',
    height: 50,
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
  },
  otherButtons:{
    width: '65%',
    height: 50,
    borderRadius: 30,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.1,
    shadowRadius: 18,
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginTextView:{
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container2:{
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

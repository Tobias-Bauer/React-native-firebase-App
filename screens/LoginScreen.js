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
  ImageBackground,
  StatusBar
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { StackNavigator } from 'react-navigation';
import firebase from '@firebase/app'
import '@firebase/auth'

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
    isActive: true,
    hidePassword: false,
    userInfo: null,
  }
  componentWillMount(){
 
        //Tests if user is signed in
    firebase.auth().onAuthStateChanged((user) => {
      if (firebase.auth().currentUser != null) {
        this.props.navigation.navigate('TabNavigator', {});
      }else{
        this.props.navigation.navigate('Login', {});
      }
    });
    
  }
  onPressLogin(){
    this.setState({error: '', loading: true});
    var str = this.state.email.trimRight()
    const email = str.trimLeft()
    this.setState({email})
    const password = this.state.password;
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
      this.props.navigation.navigate('TabNavigator', {});
    })
    .catch(function(error) {
      //this.setState({error: 'Authentication failed', loading: false});
      alert(`Login ${error}`);
      
    })
  }
  //Send info to Firebase
  writeUserDataFacebook(){
    var profileMail = this.state.userInfo.email.toLowerCase()
    /*var user1 = firebase.auth().currentUser;
    if (firebase.auth().currentUser == null){
      Alert.alert("Not Logged in please try again.")
    }
    user1.providerData.forEach(function(profile){
      profileMail = profile.email;
    })*/
    
    firebase.firestore().collection('user').doc(profileMail).set(this.state.userInfo)
    firebase.firestore().collection('user').doc(profileMail).add({show: true})
    }
    //Login with facebook
  async loginWithFacebook() {
    try {
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      } = await Expo.Facebook.logInWithReadPermissionsAsync('262997934355158', {
        permissions: ['public_profile'],
      });
      if (type === 'success') {
        const credential = firebase.auth.FacebookAuthProvider.credential(token)
        firebase.auth().signInAndRetrieveDataWithCredential(credential).catch((error) => {
          console.log(error)
        });
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,email,name,picture.type(large)`);
        const userInfo = await response.json();
        this.setState({userInfo});
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
    this.writeUserDataFacebook();
  }
  renderCurrentState() {
    if (this.state.authenticating){
      return (
        <View>
          <ActivityIndicator size='large'/>
        </View>
      )
    }else{
    return (
      <ImageBackground blurRadius={20} source={require("../assets/background_1.jpg")} style={styles.container}>
        <StatusBar barStyle="light-content"/>
      <View style={styles.loginTextView}><Text style={styles.loginText} >Thats the first line of text!</Text></View>
      <View style={{flex: 3.5, width: '100%', alignItems: 'center'}}>
        <View style={styles.loginView}>
        <View style={{width: '100%', height: 8, backgroundColor: 'red',}}></View>
        <Text style={styles.loginViewText}>LOGIN</Text>
        <View style={{top: '35%',}} >
          <TextInput style={styles.emailfield} underlineColorAndroid="transparent" placeholder="E-mail" onChangeText={email => this.setState({ email })} value={this.state.email}/>
          <TextInput style={styles.passwordfield} underlineColorAndroid="transparent" secureTextEntry={!this.state.hidePassword} placeholder="Passwort" onChangeText={password => this.setState({ password })} value={this.state.password}/>
        </View>
        <View style={styles.showPasswordView} >
          <Switch style={styles.switch} value={this.state.hidePassword} onValueChange={() => this.setState({hidePassword: !this.state.hidePassword})}/>
          <Text style={styles.showPassword}>Show password</Text>
        </View>
        </View>
        <View style={styles.ButtonView} pointerEvents='box-none'>
          <TouchableOpacity
            style={styles.loginScreenButton}
            onPress={() => this.onPressLogin()}>
            <Image style={{width: 80, height: 80, }} source={require("../assets/LoginButton.png")}/>
          </TouchableOpacity>
       </View>
      </View>
        <View style={[styles.container2, {justifyContent: 'flex-start'}]}><ImageBackground onPress={() => this.onPressSignUp()} imageStyle={{ borderRadius: 25 }} source={require("../assets/Gradient_1.png")} style={styles.otherButtons}>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('SignUp', {})} style={{width: '100%', height: '100%', alignItems: 'center',justifyContent: 'center',}}><Text style={{color: 'white',}}>Sign up</Text></TouchableOpacity>
        </ImageBackground></View>

        <View style={{flex: 0.25}}/>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style = {styles.lineStyle}/>
          <View style={{flex: 0.1}}/>
          <Text style={{color: 'white'}}>Or use</Text>
          <View style={{flex: 0.1}}/>
          <View style = {styles.lineStyle}/>
        </View>
        <View style={{flex: 0.25}}/>

        <View style={[styles.container2, {flexDirection: "row"}]}>
          <View style={styles.signUpButtons}>
          <TouchableOpacity onPress={this.loginWithFacebook.bind(this)} style={{width: '100%', height: '100%', alignItems: 'center',justifyContent: 'center',}}><Image style={{width:45, height:45,}} source={require("../assets/Facebook.png")}/></TouchableOpacity></View>
          <View style={{width: '15%'}}/>
          <Text style={{color: 'white'}}>or</Text>
          <View style={{width: '15%'}}/>
          <View style={styles.signUpButtons}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('SocialMedia', {})} style={{width: '100%', height: '100%', alignItems: 'center',justifyContent: 'center',}}><Image style={{width:45, height:45,}} source={require("../assets/Google.png")}/></TouchableOpacity></View>
        </View>
        <View style={{flex: 0.25}}/>
        </ImageBackground>
    )
  }
}

  render() {
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
  showPassword:{
    position: 'absolute',
    left: '20%',
  },
  switch:{
    left: '-5%',
    position: 'absolute',
  },
  showPasswordView:{
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
  signUpButtons:{
    width: 80,
    height: 80,
    borderRadius: 50,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.1,
    shadowRadius: 18,
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  loginTextView:{
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lineStyle:{
    borderWidth: 0.5,
    borderColor:'white',
    width: '30%',
  },
  container2:{
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

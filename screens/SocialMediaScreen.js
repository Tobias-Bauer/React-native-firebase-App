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
  AsyncStorage
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { LoginManager,LoginButton,AccessToken,GraphRequest,GraphRequestManager} from 'react-native-fbsdk';
const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

EStyleSheet.build({
    $textColor: 'white'
  });


export default class HomeScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {userInfo: null,};
    }
    static navigationOptions = {
        title: "Socialmedia", 
    };
    writeUserDataFacebook(){
      var profileMail;
      var user1 = firebase.auth().currentUser;
      if (user1 != null) {
      user1.providerData.forEach(function (profile) {
        profileMail = profile.email;
      });
    }
      firebase.firestore().collection('user').doc(profileMail).set(this.state.userInfo)
      }
    //Facebook login
    async loginWithFacebook() {
  try {
    const {
      type,
      token,
      expires,
      permissions,
      declinedPermissions,
    } = await Expo.Facebook.logInWithReadPermissionsAsync('262997934355158', {permissions: ['public_profile'],});
    if (type === 'success') {
      const credential = firebase.auth.FacebookAuthProvider.credential(token)
      firebase.auth().signInAndRetrieveDataWithCredential(credential).catch((error) => {
        console.log(error)
      })
      // Get the user's name using Facebook's Graph API
      const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,email,name,picture.type(large)`);
      const userInfo = await response.json();
      this.setState({userInfo});
    } else {
      // type === 'cancel'
    }
  } catch ({ message }) {
    alert(`Facebook Login Error: ${message}`);
  }
  this.writeUserDataFacebook()
}
//Google login
      async loginWithGoogle() {
        const { type, token } = await await Expo.Google.logInAsync({
            //androidClientId: YOUR_CLIENT_ID_HERE,
            iosClientId: '258088831368-h42kgsqarctlpuaugksgqeh6plkh0ese.apps.googleusercontent.com',
            scopes: ['profile', 'email'],
          });
        if (type == 'success') {
          const credential = firebase.auth.GoogleAuthProvider.credential(token)
          firebase.auth().signInAndRetrieveDataWithCredential(credential).catch((error) => {
            console.log(error)
          })
        }
      }
      //339771303079-3mse4b0pvur499bof3ri61heahjtsj9f.apps.googleusercontent.com
    render() {
        return(
        <View style={styles.container}>
            <View style={styles.container}><TouchableOpacity style={[styles.buttons, {backgroundColor: '#3b5998'}]} onPress={this.loginWithFacebook.bind(this)}>
            <Image style={styles.img} source={require("../assets/Facebook.png")}/><Text style={{left: 20, color: 'white'}}>Facebook</Text>
            </TouchableOpacity></View>
            <View style={styles.container}><TouchableOpacity style={styles.buttons} onPress={() => this.loginWithGoogle()}>
            <Image style={styles.img} source={require("../assets/Google.png")}/><Text style={{left: 20}}>Login with Google</Text>
            </TouchableOpacity></View>
            <View style={styles.container}><TouchableOpacity style={styles.buttons}>
            <Text>Github</Text>
            </TouchableOpacity></View>
            <View style={styles.container}><TouchableOpacity style={styles.buttons}>
            <Text>Play Spiele</Text>
            </TouchableOpacity></View>
            <View style={styles.container}><TouchableOpacity style={styles.buttons}>
            <Text>Twitter</Text>
            </TouchableOpacity></View>
        </View>
        );
    }
}
const styles = EStyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height:'100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttons: {
        flexDirection: 'row',
        height: '50%',
        width: '80%',
        borderRadius: 50,
        backgroundColor: 'white',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 15 },
        shadowOpacity: 0.1,
        shadowRadius: 18,
        elevation: 20,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    img:{
        width:45,
        height:45,
        left: '20%',
    }
})
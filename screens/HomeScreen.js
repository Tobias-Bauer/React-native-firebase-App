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
  Image
} from 'react-native';
import Info from './SocialMediaScreen';
import EStyleSheet from 'react-native-extended-stylesheet';
import firebase from '@firebase/app'
import '@firebase/auth'

export default class HomeScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {userInfo: null, pictureUrl: null};
    }

    static navigationOptions = {
        title: "Home Screen",
        headerLeft: null,
    };
    signOut(){
        firebase.auth().signOut()
        .then(function() {
          
        })
        .catch(function(error) {
          // An error happened
        });
    }
    
   async readUserData() {
        var profileMail
        var user1 = firebase.auth().currentUser;
        if (user1 != null) {
        user1.providerData.forEach(function (profile) {
          profileMail = profile.email;
        })
            const userInfo = await firebase.firestore().collection('user').doc(profileMail).get()
            const pictureUrl = userInfo.data().picture.data.url
            this.setState({pictureUrl})
      }
    }
    
    componentWillMount(){
        this.readUserData()
    }
    showImage(){
        if (this.state.pictureUrl != null){
            return (
                <Image source={{uri: this.state.pictureUrl}} style={styles.profilePicture} />
            
            )
        }
    }
    checkVerifycation(){
        firebase.auth().currentUser.reload().then(() =>{
        if(!firebase.auth().currentUser.emailVerified){
            Alert.alert("Your Verifycation is not completed")
        }else{
            Alert.alert("Your Verifycation is completed")
            this.forceUpdate()
        }
        })
    }
    renderState(){
        if (!firebase.auth().currentUser.emailVerified){
            firebase.auth().currentUser.sendEmailVerification()
            return(
                <View style={styles.verifyView}>
                    <View style={{flex: 0.3}}/>
                    <Text style={styles.verifyText}>Please verify your email</Text>
                    <Text style={styles.verifyText}>Check your mailbox to go on</Text>
                    <View style={{flex: 5}}/>
                    <TouchableOpacity style={styles.verifyButton} onPress={() => this.checkVerifycation()}></TouchableOpacity>
                    <View style={{flex: 3}}/>
                </View>
            );
        }else{
            //Home screen
            return(
            <View>
                <Text>Second View: {this.state.pictureUrl}</Text>
                {this.showImage()}
                <Button onPress={() => this.signOut()} title="Sign Out"/>
                <Button onPress={() => this.props.navigation.navigate('Profile', {})} title="Profile"/>
                <Button onPress={() => this.props.navigation.navigate('Article', {})} title="Create Article"/>
            </View>
            );
        }
    }
    
    render(){
        return(
            <View style={{width: '100%', height: '100%'}}>
                {this.renderState()}
            </View>
        );
    }
}

const styles = EStyleSheet.create({
    profilePicture: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
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
});
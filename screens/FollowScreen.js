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


export default class FollowScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        email: null,
        pictureUrl: null,
        name: null,
        following: null,
        currentUserEmail: null
    }
  }
  static navigationOptions = ({ navigation }) => {
    return {
      title: `${navigation.state.params.name}`
    }
  }

  componentWillMount(){
    const email = this.props.navigation.getParam('email')
    this.readUserData(email)
    this.readCurrentUserData(email)
  }

  async readUserData(email) {
    this.setState({email})
    const userInfo = await firebase.firestore().collection('user').doc(email).get()
    const pictureUrl = userInfo.data().picture.data.url
    const name = userInfo.data().name
    this.setState({pictureUrl, name})
  }

  async readCurrentUserData(email){
    const currentUserEmail = firebase.auth().currentUser.email
    this.setState({currentUserEmail})
    const currentUserInfo = await firebase.firestore().collection("user").doc(currentUserEmail).collection("follows").doc(email).get()
    const savedEmail = currentUserInfo.data().email
    if(savedEmail == email){
        this.setState({following: true})
    }else{
        this.setState({following: false})
    }
  }

  follow(){
    const email = this.state.email
    Alert.alert("You followed: " + email)
    firebase.firestore().collection("user").doc(this.state.currentUserEmail).collection("follows").doc(email).set({
        email: email,
    })
    this.setState({following: true})
  }

  unfollow(){
    const email = this.state.email
    firebase.firestore().collection("user").doc(this.state.currentUserEmail).collection("follows").doc(email).delete()
    .then(function() {
        Alert.alert("You unfollowed: " + email)
    })
    this.setState({following: false})
  }

  showImage(){
    if (this.state.pictureUrl != null){
        return (
            <Image source={{uri: this.state.pictureUrl}} style={styles.profilePicture} />
        )
    }
  }

  renderFollowIcon(){
    if(this.state.following){
        return(
            <TouchableOpacity onPress={() => this.unfollow()}>
                <Image source={require("../assets/unfollow.png")} style={styles.FollowIcon}/>
            </TouchableOpacity>
        )
    }else{
        return(
            <TouchableOpacity onPress={() => this.follow()}>
                <Image source={require("../assets/follow.png")} style={styles.FollowIcon}/>
            </TouchableOpacity>
        )
    }
  }

  render() {
    return (
      <View style={styles.page}>
        {this.showImage()}
        <Text style={styles.nameText}>{this.state.name}</Text>
        <Text>{this.state.email}</Text>
        {this.renderFollowIcon()}
      </View>
    );
  }
}
const styles = EStyleSheet.create({
    page: {
        alignItems: 'center',
        backgroundColor: 'white',
        height: '100%'
    },
    profilePicture: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginTop: 15,
        marginBottom: 15
    },
    FollowIcon: {
        width: 30,
        height: 30,

    },
    nameText: {
        fontWeight: 'bold'
    }
});

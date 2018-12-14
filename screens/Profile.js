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

export default class Profile extends React.Component {
    constructor(props){
        super(props);
        this.state = {userInfo: null, pictureUrl: null, username: null, email: null};
    }

    static navigationOptions = {
        title: "Profile",
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
            const username = userInfo.data().name
            const email = userInfo.data().email
            this.setState({pictureUrl})
            this.setState({username})
            this.setState({email})
      }
    }
    componentWillMount(){
        this.readUserData()
    }
    showImage(){
        if (this.state.pictureUrl != null){
            return (
                <View style={{alignItems:'center'}} >
                    <Image source={{uri: this.state.pictureUrl}} style={styles.profilePicture} />
                </View>
            )
        }
    }
    render(){
        return(
            <View>
                {this.showImage()}
                <View style={{flexDirection:'row'}}>
                    <Text>Name: </Text>
                    <TextInput value={this.state.username} />
                </View>
                <View style={{flexDirection:'row'}}>
                    <Text>Email: </Text>
                    <Text>{this.state.email}</Text>
                </View>
                <View style={{flexDirection:'row'}}>
                    <Text>About me: </Text>
                    <TextInput/>
                </View>
                <Button title={"Save"}/>
            </View>
        )
    }
}

const styles = EStyleSheet.create({
    profilePicture: {
        width: 180,
        height: 180,
        borderRadius: 90,
    },
});
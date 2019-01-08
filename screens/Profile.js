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
} from 'react-native';
import Info from './SocialMediaScreen';
import EStyleSheet from 'react-native-extended-stylesheet';
import firebase from '@firebase/app'
import '@firebase/auth'

export default class Profile extends React.Component {
    constructor(props){
        super(props);
        this.state = {userInfo: null, pictureUrl: null, username: null, email: null, newEmail: null, newUsername: null, status: false, show: null};
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
            const password = userInfo.data().password
            const show = userInfo.data().show
            this.setState({pictureUrl})
            this.setState({username})
            this.setState({password})
            this.setState({email})
            this.setState({newEmail: email})
            this.setState({newUsername: username})
            this.setState({show})

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
    save(){
        /*if(this.state.email != this.state.newEmail && this.state.newEmail != null){
            firebase.auth()
            .signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(function(user) {
                user.updateEmail(this.state.newEmail)
            })
        }*/
        firebase.firestore().collection('user').doc(this.state.email).update({
            email: this.state.newEmail,
            name: this.state.newUsername,
        })
    }
    //Not ready yet
    renderPasswordView(){
        if(this.state.status){
            return(
                <View style={{width:'100%',height:'100%', position: 'absolute'}}>
                    <TouchableOpacity style={{backgroundColor:'red', width:'100%',height:'100%', position: 'absolute'}} onPress={() => {Alert.alert("Clicked")}}/>
                    <View style={styles.passwordViewPosition}>
                        <View style={{flex: 0.1}}/>
                        <View style={styles.passwordView}>
                            <Text style={styles.passwordViewText}>New Password</Text>
                        </View>
                        <View style={{flex: 0.3}}/>
                    </View>
                </View>
        )}
    }
    changeLanguage(){
        //Not ready yet
    }
    updateShow(state){
        firebase.firestore().collection('user').doc(this.state.email).update({show: state})
        this.setState({show: state})
    }
    render(){
        return(
            <View style={{width:'100%',height:'100%'}}>
                {this.showImage()}
                <View style={{flexDirection:'row'}}>
                    <Text>Name: </Text>
                    <TextInput value={this.state.username} onChangeText={newUsername => this.setState({newUsername})}/>
                </View>
                <View style={{flexDirection:'row'}}>
                    <Text>Sprache: </Text>
                    {this.changeLanguage()}
                </View>
                <View style={{flexDirection:'row'}}>
                    <Text>Email: </Text>
                    <TextInput value={this.state.email} onChangeText={newEmail => this.setState({newEmail})}/>
                </View>
                <View style={{flexDirection:'row'}}>
                    <Text>About me: </Text>
                    <TextInput/>
                </View>
                <Button title={"Change Password"} onPress={() => this.setState({status: !this.state.status})}/>
                <Button title={"Save"} onPress={() => this.save()}/>
                //Change Password
                {this.renderPasswordView()}
                <Text>Show all posts</Text>
                <Switch style={styles.switch} value={this.state.show} onValueChange={(state) => this.updateShow(state)}/>
                <Button onPress={() => this.signOut()} title="Sign Out"/>
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
    passwordView: {
        width: '80%',
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 50,
    },
    passwordViewPosition: {
        flexDirection: 'column',
        position: 'absolute',
        alignItems: 'center',
        width: '100%',
        height: '100%'
    },
    passwordViewText: {
        fontSize: 30,
        fontWeight: 'bold',
        top: 25,
        left: 15
    }
});
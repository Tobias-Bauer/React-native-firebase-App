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
  FlatList
} from 'react-native';
import Info from './SocialMediaScreen';
import EStyleSheet from 'react-native-extended-stylesheet';
import firebase from '@firebase/app'
import '@firebase/auth'

export default class HomeScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {userInfo: null, pictureUrl: null, show: null, data: []};
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
        if (firebase.auth().currentUser != null) {
          firebase.auth().currentUser.providerData.forEach(function (profile) {
          profileMail = profile.email;
        })
            const userInfo = await firebase.firestore().collection('user').doc(profileMail).get()
            const pictureUrl = userInfo.data().picture.data.url
            const show = userInfo.data().show
            this.setState({pictureUrl})
            this.setState({show})
      }
      firebase.firestore().collection('user').get().then((users) => {
        users.docs.forEach(doc => {
            firebase.firestore().collection("user").doc(doc.data().email).collection("collection").get().then((posts) => {
                posts.docs.forEach(post => {
                    this.addPostToArray(post)
                })
            })
        })
      })
    }
    
    async addPostToArray(post){
        const userInfo = await firebase.firestore().collection('user').doc(post.data().User).get()
        this.setState(state => {
            const data = [...state.data, ...[{Title: post.data().Title, Text: post.data().Text, email: post.data().User, name: userInfo.data().name}]]
            return{
                data
            }
        })
    }

    componentWillMount(){
        if (!firebase.auth().currentUser.emailVerified){
            firebase.auth().currentUser.sendEmailVerification()
        }
        this.readUserData()
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
            this.forceUpdate()
        }
        })
    }

    reload(){
        firebase.auth().currentUser.reload().then(() =>{
            this.setState({data: []})
            this.readUserData().then(() =>{
                this.forceUpdate()
            })
        })
    }

    renderState(){
        if (!firebase.auth().currentUser.emailVerified){
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
                <Button onPress={() => this.reload()} title={"Reload"} />
                <FlatList
                    data={this.state.data}
                    renderItem={({ item }) => (
                            <TouchableOpacity style={styles.box} onPress={() => this.props.navigation.navigate('ShowArticle', {authorEmail: item.email, title: item.Title})}>
                                <Text style={styles.Username}>{item.Text}</Text>
                                <Text style={styles.Usermail}>{item.name}</Text>
                            </TouchableOpacity>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
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
    box: {
        borderBottomColor: 'grey',
        borderBottomWidth: 0.5,
    },
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
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
  FlatList,
  ScrollView,
  RefreshControl
} from 'react-native';
import Info from './SocialMediaScreen';
import EStyleSheet from 'react-native-extended-stylesheet';
import firebase from '@firebase/app'
import '@firebase/auth'

export default class HomeScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {userInfo: null, pictureUrl: null, show: null, data: [], refreshing: false};
    }

    static navigationOptions = {
        title: "Home Screen",
        headerLeft: null,
    };
    
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
        this.readUserData()
    }

    reload(){
        firebase.auth().currentUser.reload().then(() =>{
            this.setState({data: []})
            this.readUserData().then(() =>{
                this.forceUpdate()
            })
        })
    }
    _onRefresh = () => {
        this.reload()
      }

    render(){
        //Home screen
        return(
        <ScrollView
        refreshControl={
        <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
        />}>
            <FlatList
                data={this.state.data}
                renderItem={({ item }) => (
                        <TouchableOpacity style={styles.box} onPress={() => this.props.navigation.navigate('ShowArticle', {authorEmail: item.email, title: item.Title})}>
                            <Text style={styles.Username}>{item.Title}</Text>
                            <Text style={styles.Usermail}>{item.name}</Text>
                        </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
        </ScrollView>
        )    
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
});
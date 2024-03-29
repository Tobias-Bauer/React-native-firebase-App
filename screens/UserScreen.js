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
  ScrollView,
  FlatList,
  RefreshControl
} from 'react-native';
import Info from './SocialMediaScreen';
import EStyleSheet from 'react-native-extended-stylesheet';
import firebase from '@firebase/app'
import '@firebase/auth'

export default class HomeScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {data: [], name: null, loading: true, currentUserEmail: null, refreshing: false};
    }

    static navigationOptions = {
        title: "Users",
        headerLeft: null,
    };

    componentWillMount(){
        this.readUserData()
    }

    async readUserData() {
        this.setState({currentUserEmail: firebase.auth().currentUser.email})
        firebase.firestore().collection('user').get().then((users) => {
            users.docs.forEach(doc => {
                if(doc.data().email != this.state.currentUserEmail){
                this.addUserToArray(doc)
                }
                //Only for testing reasons
                //Alert.alert(doc.data().name)
            })
        })
        this.setState({loading: false})
    }

    addUserToArray(doc){
        this.setState(state => {
            const data = [...state.data, ...[{name: doc.data().name, url: doc.data().picture.data.url, email: doc.data().email}]]
            return{
                data
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
    _onRefresh = () => {
        this.reload()
      }

    render(){
        return(
            <ScrollView
            refreshControl={
            <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}
            />}>>
                <FlatList
                    data={this.state.data}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Follow', {email: item.email, name: item.name})} style={styles.UserView}>
                            <Image source={{uri: item.url}} style={styles.UserImage}/>
                            <View style={styles.Textbox}>
                                <Text style={styles.Username}>{item.name}</Text>
                                <Text style={styles.Usermail}>{item.email}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
            </ScrollView>
        );
    }
}

const styles = EStyleSheet.create({
    UserImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginLeft: 5
    },
    Textbox: {
        flexDirection: 'column'
    },
    Username: {
        marginTop: 20,
        marginLeft: '5%',
        fontWeight: 'bold',
        fontSize: 19
    },
    Usermail: {
        marginTop: 10,
        marginLeft: '5%',
    },
    UserView: {
        flexDirection: 'row',
        marginTop: 5,
        marginBottom: 5,
        height: 110,
        borderBottomColor: 'grey',
        borderBottomWidth: 0.5,
    }
});
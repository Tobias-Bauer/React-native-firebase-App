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
  ListItem
} from 'react-native';
import Info from './SocialMediaScreen';
import EStyleSheet from 'react-native-extended-stylesheet';
import firebase from '@firebase/app'
import '@firebase/auth'

export default class HomeScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {data: [], name: null, loading: true};
    }

    static navigationOptions = {
        title: "Users",
        headerLeft: null,
    };

    componentWillMount(){
        this.readUserData()
    }

    async readUserData() {
        firebase.firestore().collection('user').get().then((users) => {
            users.docs.forEach(doc => {
                this.addUserToArray(doc)
                //renderUsers(doc)
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

    follow(email){
        Alert.alert("You followed: " + email)
    }

    render(){
        return(
            <ScrollView>
                <FlatList
                    data={this.state.data}
                    renderItem={({ item }) => (
                        <View style={styles.UserView}>
                            <Image source={{uri: item.url}} style={styles.UserImage}/>
                            <View style={styles.Textbox}>
                                <Text style={styles.Username}>{item.name}</Text>
                                <Text style={styles.Usermail}>{item.email}</Text>
                                <TouchableOpacity onPress={() => this.follow(item.email)}>
                                    <Image source={require("../assets/follow.png")} style={styles.FollowIcon}/>
                                </TouchableOpacity>
                            </View>
                        </View>
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
        borderRadius: 50
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
    FollowIcon: {
        width: 30,
        height: 30,
        marginLeft: '75%'
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
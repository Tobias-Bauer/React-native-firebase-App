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
import EStyleSheet from 'react-native-extended-stylesheet';
import firebase from '@firebase/app'
import '@firebase/auth'

export default class ShowArticleScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {email: null, title: '', Text: ''};
    }

    static navigationOptions = ({ navigation }) => {
        return {
        title: `${navigation.state.params.title}`,
        }
    }

    async readUserData(email) {
        this.setState({email})
        const userInfo = await firebase.firestore().collection('user').doc(email).get()
        const article = await firebase.firestore().collection('user').doc(email).collection('collection').doc(this.props.navigation.getParam('title')).get()
        this.setState({title: article.data().Title, Text: article.data().Text})
    }

    componentWillMount(){
        const email = this.props.navigation.getParam('authorEmail')
        this.readUserData(email)
    }

    render(){
        return(
            <View>
                <Text>{this.state.title}</Text>
                <Text>{this.state.Text}</Text>
            </View>
        )
    }
}

const styles = EStyleSheet.create({
});
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
  Dimensions
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import firebase from '@firebase/app'
import '@firebase/auth'

export default class ShowArticleScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {CoverHeight: null, CoverWidth: null, coverUrl: "null", email: null, title: '', Text: '', price: null};
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
        if(article.data().Cover != "null"){
            Image.getSize(article.data().Cover, (cwidth, cheight) => {this.calculate(cwidth, cheight)})
        }       
        this.setState({title: article.data().Title, Text: article.data().Text, price: article.data().Price, coverUrl: article.data().Cover})
    }
    calculate(cwidth, cheight){
        const windowWidth = Dimensions.get('window').width
        var height = cheight * (windowWidth / cwidth)
        this.setState({CoverHeight: height})
    }

    componentWillMount(){
        const email = this.props.navigation.getParam('authorEmail')
        this.readUserData(email)
    }

    render(){
        return(
            <View>
    {this.state.coverUrl != "null" ? <Image source={{uri: this.state.coverUrl}} style={{width: '100%', height: this.state.CoverHeight}}/> : null}
                <Text>{this.state.title}</Text>
                <Text>{this.state.Text}</Text>
                <Text>{this.state.price}€</Text>
            </View>
        )
    }
}

const styles = EStyleSheet.create({
});
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
  Slider
} from 'react-native';
import Info from './SocialMediaScreen';
import EStyleSheet from 'react-native-extended-stylesheet';
import firebase from '@firebase/app'
import '@firebase/auth'

export default class HomeScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {title: null, text: null, slider: true, value: 0};
    }

    static navigationOptions = {
        title: "Create Article",
        headerLeft: null,
    };
    submit(){
        if(this.state.title != null && this.state.text != null && this.state.title != "" && this.state.text != ""){
            var profileMail
            var user1 = firebase.auth().currentUser;
            if (user1 != null) {
            user1.providerData.forEach(function (profile) {
            profileMail = profile.email;
            })
            }
            firebase.firestore().collection("user").doc(profileMail).collection("collection").doc(this.state.title).set({
                Title: this.state.title,
                Text: this.state.text,
                User: firebase.auth().currentUser.email
            })
        }else{
            Alert.alert("Please insert your Text")
        }
    }
    renderSlider(){
        if(this.state.slider){
            return(
                <Slider value={this.state.value} onValueChange={(value) => this.setState({value})} />
            )
        }else{
            return(
                <TextInput/>
            )
        }
    }
    render(){
        return(
            <View>
                <Text>Subtitle</Text>
                <TextInput style={styles.SubtitleText} onChangeText={title => this.setState({title})}/>
                <Text>Article</Text>
                <TextInput scrollEnabled={true} multiline={true} style={styles.ArticleText} onChangeText={text => this.setState({text})}/>
                {this.renderSlider()}
                <Button title={'Submit'} onPress={() => this.submit()}/>
            </View>
        );
    }
}

const styles = EStyleSheet.create({
    SubtitleText:{
        width: '80%',
        height: 30,
        backgroundColor: 'white',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 15 },
        shadowOpacity: 0.1,
        shadowRadius: 18,
        elevation: 20,
    },
    ArticleText:{
        width: '80%',
        height: 300,
        backgroundColor: 'white',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 15 },
        shadowOpacity: 0.1,
        shadowRadius: 18,
        elevation: 20,
    }
});
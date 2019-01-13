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
        this.state = {title: null, text: null, slider: true, value: 0, price: ""};
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
            if(this.state.slider){
                var price = this.state.value
            }else{
                if(this.state.price != ""){
                    var price = this.state.price
                }else{
                    var price = 0
                }
            }
            firebase.firestore().collection("user").doc(profileMail).collection("collection").doc(this.state.title).set({
                Title: this.state.title,
                Text: this.state.text,
                User: firebase.auth().currentUser.email,
                Price: price
            })
        }else{
            Alert.alert("Please insert your Text")
        }
    }
    setText(text){
        var isnum = /^\d+$/.test(text);
        if(isnum){
            var save = text
        }else{
            if(text != ""){
                Alert.alert("Please use only even numbers")
                var save = ""
            }
        }
        this.setState({price: save})
    }
    renderSlider(){
        if(this.state.slider){
            return(
                <View style={styles.sliderView}>
                    <Text style={{marginLeft: '2%'}}>{this.state.value}€</Text>
                    <Slider style={styles.slider} value={this.state.value} maximumValue={1000} step={1} onValueChange={(value) => this.setState({value})} />
                    <Button title={'->'} onPress={() => this.setState({slider: false})}/>
                </View>
            )
        }else{
            return(
                <View style={styles.sliderView}>
                    <TextInput value={this.state.price} style={styles.priceInput} keyboardType='numeric' onChangeText={(text) => this.setText(text)}/>
                    <Button title={'->'} onPress={() => this.setState({slider: true})}/>
                </View>
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
    },
    sliderView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    slider: {
        width: '80%',
        marginLeft: '5%'
    },
    priceInput: {
        width: '10%',
        height: 40
    },
});
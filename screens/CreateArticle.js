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
  Slider,
  Keyboard,
  ScrollView,
  ImageBackground
} from 'react-native';
import { ImagePicker, Permissions } from 'expo'
import Info from './SocialMediaScreen'
import EStyleSheet from 'react-native-extended-stylesheet'
import firebase from '@firebase/app'
import '@firebase/auth'

export default class HomeScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {imagePicked: false, cover: false, image: null, title: null, text: null, slider: true, value: 0, price: ""};
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
    _pickImage = async () => {
        const permissions = Permissions.CAMERA_ROLL;
        const status = await Permissions.askAsync(permissions);
        if (status !== 'granted') {
            let result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4, 3],
            });
            
            if (!result.cancelled) {
                this.setState({ image: result.uri, imagePicked: true })
                
                var response = await fetch(result.uri)
                const blob = await response.blob()
                var ref = firebase.storage().ref().child('user/'+firebase.auth().currentUser.email+'/article/'+ 'test-image')//Subtitle missing
                ref.put(blob)
            }
        }
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
            <ScrollView>
                <TouchableOpacity style={styles.View} activeOpacity={1} onPress={Keyboard.dismiss}>
                    <Text>Subtitle</Text>
                    <TextInput style={styles.SubtitleText} onChangeText={title => this.setState({title})}/>
                    <Text>Article</Text>
                    <TextInput scrollEnabled={true} multiline={true} style={styles.ArticleText} onChangeText={text => this.setState({text})}/>
                    {this.renderSlider()}
                    {!this.state.cover && <Button title={'Add Cover'} onPress={() => this.setState({cover: true})}/>}
                    <View style={styles.deleteImageContainer}>
                        {this.state.cover && <Image source={require('../assets/Delete.png')} style={styles.deleteImage}/>}
                    </View>
                    {!this.state.imagePicked && this.state.cover && <ImageBackground source={require('../assets/ImagePlaceholder.png')} style={{width: '100%', height: 210}} resizeMode="contain">
                        <Button title={"Choose Photo"} onPress={() => this._pickImage()}/>
                        <Button title={"Take Photo"} onPress={() => this._takePhoto()}/>
                    </ImageBackground>}
                    {this.state.image && <Image source={{ uri: this.state.image }} style={{width: '100%', height: 210}} resizeMode="contain"/>}
                    <Button title={'Submit'} onPress={() => this.submit()}/>
                </TouchableOpacity>
            </ScrollView>
        );
    }
}

const styles = EStyleSheet.create({
    View: {
        height: '100%',
        alignItems: 'center'
    },
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
        width: '100%',
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
    deleteImage: {
        width: 30,
        height: 30,
        marginBottom: -20,
    },
    deleteImageContainer: {
        flexDirection: 'row',
        zIndex: 1000,
        width: '87%',
        justifyContent: 'flex-end',
    },
});
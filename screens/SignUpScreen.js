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
  ImageBackground
} from 'react-native';
import Info from './SocialMediaScreen';
import EStyleSheet from 'react-native-extended-stylesheet';
import firebase from '@firebase/app'
import '@firebase/auth'

export default class HomeScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {hidePassword: false,email: "", password: '', password1: '', name:''};
    };
    static navigationOptions = {
        header: null,
    };
    writeUserData(){
        if(this.state.name == null){
            Alert.alert("Please enter a username")
        }else{
        Usermail = this.state.email.toLowerCase();
        firebase.firestore().collection('user').doc(Usermail).set({
            email: Usermail,
            name: this.state.name,
            picture:{
                data:{
                    url: "https://images.unsplash.com/photo-1523325343676-4136d25d013b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60"
                }
            }
        })
        }
    }
    onPressSignUp(){
        if(this.state.password != this.state.password1){
            Alert.alert("The passwords aren't the same! ;(");
        }else{
            const{email, password} = this.state;
            firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
                this.props.navigation.navigate('Home', {});
            })
            .catch(function(error) {
                alert(`SignUp ${error}`);
            })
            this.writeUserData();
        }
      }
    render(){
        return(
            <ImageBackground blurRadius={20} source={require("../assets/background_2.jpg")} style={styles.container}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Login', {})} style={{flex: 1.5, justifyContent: 'center', flex: 1}}><Image style={{width: 50, height: 40, left: 20}} source={require("../assets/back.png")}/></TouchableOpacity>
                <View style={{alignItems: 'center',width: '100%', flex: 3}}>
                    <View style={styles.signUpView}>
                        <View style={{width: '100%', height: 8, backgroundColor: '#4CD6E0',}}/>
                        <Text style={styles.signUpText} >SIGN UP</Text>
                        <View style={{flex: 0.5}}/>
                        <View style={{flex: 0.7, flexDirection: "row"}}>
                            <View style={styles.spacing2}/>
                            <TextInput style={styles.field} placeholder="name" onChangeText={name => this.setState({name})}></TextInput>
                            <View style={styles.spacing2}/>
                        </View>
                        <View style={styles.spacing}/>
                        <View style={{flex: 0.7, flexDirection: "row"}}>
                            <View style={styles.spacing2}/>
                            <TextInput style={styles.field} placeholder="email" onChangeText={email => this.setState({email})}></TextInput>
                            <View style={styles.spacing2}/>
                        </View>
                        <View style={styles.spacing}/>
                        <View style={{flex: 0.7, flexDirection: "row"}}>
                            <View style={styles.spacing2}/>
                            <TextInput style={styles.field} placeholder="password" secureTextEntry={!this.state.hidePassword} onChangeText={password1 => this.setState({ password1 })}></TextInput>
                            <View style={styles.spacing2}/>
                        </View>
                        <View style={styles.spacing}/>
                        <View style={{flex: 0.7, flexDirection: "row"}}>
                            <View style={styles.spacing2}/>
                            <TextInput style={styles.field} placeholder="password" secureTextEntry={!this.state.hidePassword} onChangeText={password => this.setState({ password })}></TextInput>
                            <View style={styles.spacing2}/>
                        </View>
                        <View style={styles.spacing}/>
                        <View style={styles.showPasswordView} >
                            <Switch style={styles.switch} value={this.state.hidePassword} onValueChange={() => this.setState({hidePassword: !this.state.hidePassword})}/>
                            <Text style={styles.showPassword}>Show password</Text>
                        </View>
                  </View>
                <TouchableOpacity onPress={() => this.onPressSignUp()} style={styles.signUpButton}><Image style={{width: 80, height: 80, left: 20}} source={require("../assets/LoginButton.png")}/></TouchableOpacity>
                </View>
            </ImageBackground>
        );
    };
}
const styles = EStyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        backgroundColor: 'white',
      },
      spacing2:{
          flex:1,
      },
      showPassword:{
        position: 'absolute',
        left: '25%',
      },
      switch:{
        left: '5%',
        position: 'absolute',
      },
      showPasswordView:{
        width: '85%',
        height: 50,
        position: 'absolute',
        bottom: 0,
        justifyContent: 'center',
      },
      signUpView:{
        flex: 3,
        flexDirection: 'column',
        width: '85%',
        //minHeight: 250,
        backgroundColor: 'white',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 15 },
        shadowOpacity: 0.1,
        shadowRadius: 18,
        elevation: 20,
        borderRadius: 8,
      },
      spacing: {
          flex: 0.7
      },
    signUpText:{
        fontSize: 30,
        flex: 0.5,
        top: '3%',
        left: '8%',
        fontWeight: 'bold',
    },
    field: {
        flex: 4,
        height: 50,
        fontSize: 30,
        textAlign: 'left',
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
    },
    names: {
        flex: 1,
        textAlign: 'center',
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
    },
    signUpButton: {
        left: '25%',
        top: -40,
        flex: 1,
    },
})
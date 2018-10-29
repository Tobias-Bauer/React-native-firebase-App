import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  TouchableOpacity 
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

EStyleSheet.build({
  $textColor: 'white'
});

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.loginText}>Thats the first line of text!</Text>
        <TouchableOpacity
          style={styles.loginScreenButton}
          onPress={() => navigate('HomeScreen')}
          underlayColor='#fff'>
          <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
      </View>
    );
  }
}
const styles = EStyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  loginScreenButton:{
    right: '20%',
    left: '80% - 70',
    top: '80% - 40',
    bottom: '20%' ,
    backgroundColor:'blue',
    borderRadius:10,
    position: 'absolute',
    justifyContent:'center'
  },
  loginButtonText:{
      color:'$textColor',
      textAlign:'center'
  },
  loginText:{
    right: '50% - 80',
    left: '50% - 80',
    top: '20%',
    bottom: '80% - 30 '
  }
});

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
import Info from './SocialMediaScreen';
import EStyleSheet from 'react-native-extended-stylesheet';
import { createStackNavigator } from 'react-navigation';
const util = require('util');

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        title: "Home Screen",
        headerLeft: null,
    };
    render() {
        const {state} = this.props.navigation;
        var PictureUrl = state.params ? state.params.url : "<undefined>";
        Alert.alert(PictureUrl)
        return(
        <View>
            <Text>It worked</Text>
            <Text>Second View: {PictureUrl}</Text>
            <Image source={{uri: PictureUrl}} style={{width: 100, height: 100, borderRadius: 50}} />
        </View>
        );
    }
}
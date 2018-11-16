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
        return(
        <View>
            <Text>It worked</Text>
        </View>
        );
    }
}
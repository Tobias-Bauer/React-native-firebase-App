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
import { createStackNavigator } from 'react-navigation';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import SocialMediaScreen from './screens/SocialMediaScreen';



const Navigation = createStackNavigator({
  First: {
    screen: LoginScreen
  },
  Second: {
    screen: HomeScreen
  },
  SocialMedia: {
    screen: SocialMediaScreen
  },
});

export default Navigation;

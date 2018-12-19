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
import SignUpScreen from './screens/SignUpScreen';
import ProfileScreen from './screens/Profile';
import ArticleScreen from './screens/CreateArticle';
import firebase from './Firebase.js'

const Navigation = createStackNavigator(
  {
  Login: {
    screen: LoginScreen
  },
  SignUp: {
    screen: SignUpScreen
  },
  Home: {
    screen: HomeScreen
  },
  SocialMedia: {
    screen: SocialMediaScreen
  },
  Profile: {
    screen: ProfileScreen
  },
  Article: {
    screen: ArticleScreen
  },
}
);

export default Navigation;

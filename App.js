import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import SocialMediaScreen from './screens/SocialMediaScreen';
import SignUpScreen from './screens/SignUpScreen';
import ProfileScreen from './screens/Profile';
import ArticleScreen from './screens/CreateArticle';
import UserScreen from './screens/UserScreen';
import FollowScreen from './screens/FollowScreen'
import firebase from './Firebase.js'

const Navigation = createStackNavigator(
  {
  Login: { screen: LoginScreen },
  SignUp: { screen: SignUpScreen },
  Home: { screen: HomeScreen },
  SocialMedia: { screen: SocialMediaScreen },
  Profile: { screen: ProfileScreen },
  Article: { screen: ArticleScreen },
  Users: { screen: UserScreen },
  Follow: { screen: FollowScreen }
})

export default Navigation

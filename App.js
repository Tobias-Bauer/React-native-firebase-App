import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import SocialMediaScreen from './screens/SocialMediaScreen';
import SignUpScreen from './screens/SignUpScreen';
import SplashScreen from './screens/SplashScreen';
import ProfileScreen from './screens/Profile';
import ArticleScreen from './screens/CreateArticle';
import UserScreen from './screens/UserScreen';
import FollowScreen from './screens/FollowScreen'
import ShowArticleScreen from './screens/ShowArticleScreen'
import firebase from './Firebase.js'

const UsersStack = createStackNavigator({
  Users: { screen: UserScreen },
  Follow: { screen: FollowScreen },
},
{
  initialRouteName: 'Users',
})

const HomeStack = createStackNavigator({
  Home: { screen: HomeScreen },
  ShowArticle: { screen: ShowArticleScreen },
},
{
  initialRouteName: 'Home',
})

const ProfileStack = createStackNavigator({
  Profile: { screen: ProfileScreen },
},
{
  initialRouteName: 'Profile',
})

const ArticleStack = createStackNavigator({
  Add: { screen: ArticleScreen },
},
{
  initialRouteName: 'Add',
})

const Tabs = createBottomTabNavigator({
  Home: { screen: HomeStack },
  Users: { screen: UsersStack },
  Profile: { screen: ProfileStack },
  Add: { screen: ArticleStack },
}, {
  order: ['Home', 'Add', 'Users', 'Profile']
})

const Stack = createStackNavigator(
  {
  Splash: { screen: SplashScreen },
  Login: { screen: LoginScreen },
  SignUp: { screen: SignUpScreen },
  TabNavigator: { screen: Tabs },
  /*
  SocialMedia: { screen: SocialMediaScreen },
  Profile: { screen: ProfileScreen },
  Article: { screen: ArticleScreen },
  Users: { screen: UserScreen },
  Follow: { screen: FollowScreen }
  */
},
{
  initialRouteName: 'Splash',
  headerMode: 'none',
  navigationOptions: {
    gesturesEnabled: false
  }
})

export default Stack
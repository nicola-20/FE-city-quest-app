import { createDrawerNavigator, createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation'
import LobbyScreen from '../screens/LobbyScreen'
import SelectTrailScreen from '../screens/SelectTrailScreen'
import CreateGameScreen from '../screens/CreateGameScreen'
import JoinGameScreen from '../screens/JoinGameScreen'
import WaitingScreen from '../screens/WaitingScreen'
import CameraScreen from '../screens/CameraScreen'
import MapScreen from '../screens/MapScreen'
import QuestionScreen from '../screens/QuestionScreen'
// import Tabs from './TabNavigator'


// TAB NAVIGATOR

const GameTabs = createAppContainer(
  createBottomTabNavigator(
  {
    Camera: {
      screen: CameraScreen,
      // path: 'camera',
      title: 'Camera'
    },
    Map: {
      screen: MapScreen,
      // path: 'map',
      title: 'Map'
    },
    Question: {
      screen: QuestionScreen,
      title: 'Question'
    }
  },
  {
    initialRouteName: 'Map',
    order: ['Camera', 'Map', 'Question'],
    backBehavior: "initialRoute",
    tabBarOptions: {
      activeTintColor: '#e91e63'
    }
  }
)
)

// STACK NAVIGATOR

export default Stack = createStackNavigator(
  {
    Lobby: {
      screen: LobbyScreen,
      navigationOptions: {
        title: 'Lobby'
      }
    },
    SelectTrail: {
      screen: SelectTrailScreen,
      navigationOptions: {
        title: 'Select Trail'
      }
    },
    CreateGame: {
      screen: CreateGameScreen,
      navigationOptions: {
        title: 'Create Game'
      }
    },
    JoinGame: {
      screen: JoinGameScreen,
      navigationOptions: {
        title: 'Join Game'
      }
    },
    Waiting: {
      screen: WaitingScreen,
      navigationOptions: {
        title: 'Waiting for Players'
      }
    },
    // Game: {
    //   screen: GameTabs
    // }
  },
  {
    initialRouteName: 'Lobby'
  }
  
)

// DRAWER
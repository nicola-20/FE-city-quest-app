import { createBottomTabNavigator, createStackNavigator } from 'react-navigation'
import CameraScreen from '../screens/CameraScreen'
import MapScreen from '../screens/MapScreen'
import QuestionScreen from '../screens/QuestionScreen'

// TAB NAVIGATOR

export default Tabs = createStackNavigator(
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
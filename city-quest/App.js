import React from "react";
import {
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator,
  createDrawerNavigator,
  TabBarBottom
} from "react-navigation";
import Stack from "./navigation/Navigators";
import CameraScreen from "./screens/CameraScreen";
import MapScreen from "./screens/MapScreen";
import QuestionScreen from "./screens/QuestionScreen";
import LobbyScreen from "./screens/LobbyScreen";

const HomeBar = createAppContainer(
  createBottomTabNavigator(
    {
      Camera: CameraScreen,
      Map: MapScreen,
      Question: QuestionScreen
    },
    {
      defaultNavigationOptions: ({ navigation }) => ({
      }),
      tabBarComponent: TabBarBottom,
      tabBarPosition: "bottom",
      tabBarOptions: {
        activeTintColor: "tomato",
        inactiveTintColor: "gray",
        style: {
          backgroundColor: "#1B2737"
        }
      },
      animationEnabled: true,
      swipeEnabled: false
    }
  )
);

const AppStack = createStackNavigator(
  {
    Lobby: {
      screen: LobbyScreen
    },
    Home: {
      screen: HomeBar
    }
  },
  {
    initialRoute: "Lobby"
  }
);

// const App = createAppContainer(Stack)

const App = createAppContainer(AppStack);

export default App;

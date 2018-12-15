import React from "react";
import { View, Text, Button, TouchableOpacity, StyleSheet } from "react-native";
import {
  createDrawerNavigator,
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer,
  TabBarBottom
} from "react-navigation";
import LobbyScreen from "../screens/LobbyScreen";
import SelectTrailScreen from "../screens/SelectTrailScreen";
import CreateGameScreen from "../screens/CreateGameScreen";
import JoinGameScreen from "../screens/JoinGameScreen";
import WaitingScreen from "../screens/WaitingScreen";
import CameraScreen from "../screens/CameraScreen";
import MapScreen from "../screens/MapScreen";
import QuestionScreen from "../screens/QuestionScreen";
import InfoScreen from "../screens/InfoScreen";
import CompletedTasksScreen from "../screens/CompletedTasksScreen";
// import Tabs from './TabNavigator'

// TAB NAVIGATOR

const GameTab = createAppContainer(
  createBottomTabNavigator(
    {
      Camera: {
        screen: CameraScreen,
        // path: 'camera',
        title: "Camera"
      },
      Map: {
        screen: MapScreen,
        // path: 'map',
        title: "Map"
      },
      Question: {
        screen: QuestionScreen,
        title: "Question"
      }
    },
    {
      // defaultNavigationOptions: ({ navigation }) => ({}),
      initialRouteName: "Map",
      order: ["Camera", "Map", "Question"],
      tabBarOptions: {
        activeTintColor: "#e91e63"
      }
    }
  )
);

// DRAWER

const Drawer = createAppContainer(
  createDrawerNavigator(
    {
      Quit: {
        screen: LobbyScreen,
        header: null
      },
      Info: {
        screen: InfoScreen
      },
      CompletedTasks: {
        screen: CompletedTasksScreen
      },
      Game: {
        screen: GameTab,
        header: null
      }
    },
    {
      initialRouteName: "Game",
      // contentComponent: DrawerScreen,
      drawerWidth: 150,
      drawerPosition: "right",
      drawerType: "front",
      headerBackTitleVisible: false
    }
  )
);

// STACK NAVIGATOR

export default (Stack = createStackNavigator(
  {
    Lobby: {
      screen: LobbyScreen,
      navigationOptions: {
        title: "Lobby",
        header: null
      }
    },
    SelectTrail: {
      screen: SelectTrailScreen,
      navigationOptions: {
        title: "Select Trail"
      }
    },
    CreateGame: {
      screen: CreateGameScreen,
      navigationOptions: {
        title: "Create Game"
      }
    },
    JoinGame: {
      screen: JoinGameScreen,
      navigationOptions: {
        title: "Join Game"
      }
    },
    Waiting: {
      screen: WaitingScreen,
      navigationOptions: {
        title: "Waiting for Players"
      }
    },
    Drawer: {
      screen: Drawer,
      navigationOptions: {
        headerTitle: <Text >Game Icon</Text>,
        headerLeft: null,
        headerRight: null
      }
    }
  },
  {
    initialRoute: "Lobby",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#3EAC9A"
        // align header title center in android
      },
      headerTintColor: "#fff"
    }
  }
));

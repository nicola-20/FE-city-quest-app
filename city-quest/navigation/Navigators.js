import React from "react";
import { View, Text, Button, TouchableOpacity, StyleSheet } from "react-native";
import {
  createDrawerNavigator,
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer,
  TabBarBottom,
  withNavigation
} from "react-navigation";
import FontAwesome, { Icons, IconTypes } from "react-native-fontawesome";
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
      initialRouteName: "Map",
      order: ["Camera", "Map", "Question"],
      tabBarOptions: {
        activeTintColor: "#e91e63"
      }
    }
  )
);

// DRAWER

const DrawerIcon = ({navigation}) => {
  return (
    <TouchableOpacity
      style={{ paddingLeft: 10, paddingRight: 15 }}
      onPress={() => {
        navigation.toggleDrawer()
      }}
    >
      <Text style={{ color: "white", fontSize: 25 }}>
        <FontAwesome>{Icons.bars}</FontAwesome>
      </Text>
    </TouchableOpacity>
  );
};

const Drawer = createAppContainer(
  createDrawerNavigator(
    {
      Quit: {
        screen: LobbyScreen
      },
      Info: {
        screen: InfoScreen
      },
      CompletedTasks: {
        screen: CompletedTasksScreen
      },
      Game: {
        screen: GameTab,
      }
    },
    {
      initialRouteName: "Game",
      // contentComponent: DrawerScreen,
      drawerWidth: 150,
      drawerPosition: "right",
      drawerType: "front",
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
        title: "Select Trail",
        gesturesEnabled: false
      }
    },
    CreateGame: {
      screen: CreateGameScreen,
      navigationOptions: {
        title: "Create Game",
        gesturesEnabled: false
      }
    },
    JoinGame: {
      screen: JoinGameScreen,
      navigationOptions: {
        title: "Join Game",
        gesturesEnabled: false
      }
    },
    Waiting: {
      screen: WaitingScreen,
      navigationOptions: {
        title: "Waiting for Players",
        gesturesEnabled: false
      }
    },
    Drawer: {
      screen: Drawer,
      navigationOptions: ({
        headerLeft: null
      }),
      navigationOptions: ({navigation}) => ({
        gesturesEnabled: false,
        // header: navigation => ({
        //   title: 'My App',
        //   left: <DrawerButton navigation={navigation} />,
        // }),
        headerTitle: null,
        headerLeft: (
          <Text
            style={{
              color: "white",
              fontSize: 30,
              paddingLeft: 10,
              paddingRight: 10
            }}
          >
            <FontAwesome>{Icons.searchLocation}</FontAwesome>
          </Text>
        ),
        headerRight: <DrawerIcon navigation={navigation}/>
      })
    }
  },
  {
    initialRoute: "Lobby",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#2ebf91"
        // align header title center in android
      },
      headerTintColor: "#fff"
    }
  }
));

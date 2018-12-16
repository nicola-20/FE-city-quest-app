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
import {
  Ionicons,
  AntDesign,
  MaterialCommunityIcons,
  MaterialIcons
} from "@expo/vector-icons";
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
      defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, horizontal, tintColor }) => {
          const { routeName } = navigation.state;
          if (routeName === "Map") {
            return (
              <Ionicons
                name="md-map"
                size={30}
                color={tintColor}
              />
            );
          } else if (routeName === "Camera") {
            return (
              <AntDesign
                name="camera"
                size={30}
                color={tintColor}
              />
            );
          } else if (routeName === "Question") {
            return (
              <AntDesign
                name="questioncircle"
                size={30}
                color={tintColor}
              />
            );
          }
        }
      }),
      tabBarOptions: {
        inactiveBackgroundColor: "rgba(110, 120, 183, 1.0)",
        inactiveTintColor: "white",
        activeBackgroundColor: "rgba(110, 120, 183, 0.8)",
        activeTintColor: "white",
        showLabel: false
        // activeTintColor: "Label and icon color of the active tab",
        // activeBackgroundColor: "Background color of the active tab",
        // inactiveTintColor: "Label and icon color of the inactive tab",
        // inactiveBackgroundColor: "Background color of the inactive tab",
        // showLabel: "Whether to show label for tab, default is true",
        // showIcon: "Whether to show icon for tab, default is true",
        // style: "Style object for the tab bar",
        // labelStyle: "Style object for the tab label",
        // tabStyle: "Style object for the tab"
      }
    }
  )
);

// DRAWER

const DrawerIcon = ({ navigation }) => {
  return (
    <TouchableOpacity
      style={{ paddingLeft: 10, paddingRight: 15 }}
      onPress={() => {
        navigation.toggleDrawer();
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
        screen: GameTab
      }
    },
    {
      initialRouteName: "Game",
      // contentComponent: DrawerScreen,
      drawerWidth: 150,
      drawerPosition: "right",
      drawerType: "front"
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
      navigationOptions: ({ navigation }) => ({
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
        headerRight: <DrawerIcon navigation={navigation} />
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

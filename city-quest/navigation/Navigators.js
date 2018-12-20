import React from "react";
import { Text, TouchableOpacity } from "react-native";
import {
  createDrawerNavigator,
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer
} from "react-navigation";
import FontAwesome, { Icons } from "react-native-fontawesome";
import { Ionicons, AntDesign, MaterialIcons } from "@expo/vector-icons";
import LobbyScreen from "../screens/LobbyScreen";
import SelectTrailScreen from "../screens/SelectTrailScreen";
import CreateGameScreen from "../screens/CreateGameScreen";
import JoinGameScreen from "../screens/JoinGameScreen";
import WaitingScreen from "../screens/WaitingScreen";
import ProgressScreen from "../screens/ProgressScreen";
import MapScreen from "../screens/MapScreen";
import QuestionScreen from "../screens/QuestionScreen";
import InfoScreen from "../screens/InfoScreen";
import CompletedTasksScreen from "../screens/CompletedTasksScreen";
import PlayerCompleteScreen from '../screens/PlayerCompleteScreen';
import DrawerMenu from "../screens/DrawerMenu";
import LeaderboardScreen from "../screens/LeaderboardScreen";
import ErrorScreen from "../screens/ErrorScreen";

// TAB NAVIGATOR

const GameTab = createAppContainer(
  createBottomTabNavigator(
    {
      Progress: {
        screen: ProgressScreen,
        title: "Progress"
      },
      Map: {
        screen: MapScreen,
        title: "Map"
      },
      Question: {
        screen: QuestionScreen,
        title: "Question"
      }
    },
    {
      initialRouteName: "Map",
      order: ["Progress", "Map", "Question"],
      defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ tintColor }) => {
          const { routeName } = navigation.state;
          if (routeName === "Map") {
            return <Ionicons name="md-map" size={30} color={tintColor} />;
          } else if (routeName === "Progress") {
            return (
              <MaterialIcons name="timelapse" size={35} color={tintColor} />
            );
          } else if (routeName === "Question") {
            return (
              <AntDesign name="questioncircle" size={30} color={tintColor} />
            );
          }
        }
      }),
      tabBarOptions: {
        inactiveBackgroundColor: "rgba(131, 96, 195, 1.0)",
        inactiveTintColor: "white",
        activeBackgroundColor: "rgba(110, 120, 183, 0.8)",
        activeBackgroundColor: "rgba(131, 96, 195, 0.8)",
        activeTintColor: "white",
        showLabel: false
      }
    }
  )
);

// DRAWER

const DrawerIcon = ({ navigation }) => {
  return (
    <TouchableOpacity
      style={{ padding: 5, paddingLeft: 10, paddingRight: 15 }}
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
      },
      Leaderboard: {
        screen: LeaderboardScreen
      }
    },
    {
      initialRouteName: "Game",
      contentComponent: DrawerMenu,
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
    PlayerCompleteScreen: {
      screen: PlayerCompleteScreen,
      navigationOptions: {
        title: "Trail Completed",
        gesturesEnabled: false
    }
  },
    ErrorScreen: {
      screen: ErrorScreen,
      navigationOptions: {
        title: "Something went wrong",
        gesturesEnabled: false
      }
    },
    Drawer: {
      screen: Drawer,
      navigationOptions: ({ navigation }) => ({
        gesturesEnabled: false,
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
        backgroundColor: "#2ebf91",
        borderBottomWidth: 0,
        shadowColor: "transparent"
      },
      headerTintColor: "#fff"
    }
  }
));

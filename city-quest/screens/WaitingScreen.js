import React from "react";
import { subscribeToTimer } from "../api";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Animated,
  ActivityIndicator,
  ScrollView,
  RefreshControl
} from "react-native";
import * as api from "../api.js";
import {
  Ionicons,
  AntDesign,
  MaterialCommunityIcons,
  MaterialIcons
} from "@expo/vector-icons";

class WaitingScreen extends React.Component {
  state = {
    noOfPlayers: 0,
    game: {},
    timestamp: "no time stamp yet",
    isLoading: true,
    refreshing: false
  };
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: <Text style={styles.headerTitle}>Waiting for players</Text>,
      headerLeft: <Text />,
      headerRight: <Text />
    };
  };

  render() {
    const { navigation } = this.props;
    const { playersArray } = this.state.game;
    const currentPlayers = [];
    for (let i = 0; i < this.state.game.noOfPlayers; i++) {
      if (playersArray[i]) currentPlayers.push(playersArray[i].playerName);
      else currentPlayers.push(null);
    }
    if (this.state.isLoading)
      return (
        <ActivityIndicator
          size="large"
          color="#8360c3"
          style={{ margin: 30 }}
        />
      );
    return (
      <ScrollView
        style={styles.view}
        contentContainerStyle={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh}
          />
        }
      >
        <View style={styles.waitingHeader}>
          <Text style={styles.welcome}>Welcome to</Text>
          <Text style={styles.gameName}>{this.state.game.gameName}</Text>
        </View>
        <View style={styles.players}>
          {currentPlayers.map((player, index) => {
            return player ? (
              <View style={styles.player} key={index}>
                <MaterialCommunityIcons
                  name="account"
                  size={100}
                  // color="rgba(131, 96, 195, 1.0)"
                  color="rgba(110, 120, 183, 1.0)"
                />
                <Text style={styles.playerText}>{player}</Text>
              </View>
            ) : (
                <View style={styles.player} key={index}>
                  <MaterialCommunityIcons
                    name="account"
                    size={100}
                    // color="rgba(131, 96, 195, 1.0)"
                    color="rgba(110, 120, 183, 0.2)"
                  />
                  <Text />
                </View>
              );
          })}
        </View>
        <View style={styles.PIN}>
          <Text style={styles.text}>Game PIN:</Text>
          <Text
            style={styles.PINtext}
            onPress={() => {
              this.props.navigation.navigate("Drawer", {
                game: this.state.game,
                playerName: this.state.playerName,
                trail: this.state.trail
              });
            }}
          >
            {this.state.game.gamePin}
          </Text>
        </View>
      </ScrollView>
    );
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalID);
  }

  componentWillMount() {
    const { navigation } = this.props;
    const GamePin = navigation.getParam("GamePin", "this is your game pin");
    const playerName = navigation.getParam("PlayerName", "Player");
    const intervalID = setInterval(this.updatePlayers, 2000);
    api
      .getGame(GamePin)
      .then(game => {
        this.setState({
          game,
          isLoading: false,
          intervalID
        });
      })
      .then(() => {
        const trailId = this.state.game.trailId;
        let playerIndex;
        for (let i = 0; i < this.state.game.playersArray.length; i++) {
          if (this.state.game.playersArray[i].playerName === playerName) {
            playerIndex = i;
          }
        }
        return api.getTrailById(trailId, playerName, playerIndex);
      })
      .then(data => {
        this.setState({
          trail: data.trail,
          playerName: data.playerName
        });
      })
      .catch(err =>
        this.props.navigation.navigate("ErrorScreen", {
          msg: "Game failed",
          err
        })
      );
  }
  updatePlayers = () => {
    const Pin = this.state.game.gamePin;
    api
      .getGame(Pin)
      .then(game => {
        if (game.playersArray.length >= game.noOfPlayers) {
          this.props.navigation.navigate("Drawer", {
            game: this.state.game,
            playerName: this.state.playerName,
            trail: this.state.trail
          });
        }
        this.setState({
          game,
          isLoading: false
        });
      })
      .catch(err =>
        this.props.navigation.navigate("ErrorScreen", {
          msg: "Cannot create game",
          err
        })
      );
  };
  onRefresh = () => {
    const Pin = this.state.game.gamePin;
    this.setState({ refreshing: true });
    api
      .getGame(Pin)
      .then(game => {
        this.setState({
          game,
          refreshing: false
        });
      })
      .catch(err =>
        this.props.navigation.navigate("ErrorScreen", {
          msg: "Cannot get pin",
          err
        })
      );
  };
}
const styles = StyleSheet.create({
  view: {
    borderColor: "black",
    borderWidth: 0,
    flex: 1,
    fontFamily: "sf-thin"
  },
  players: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    borderColor: "red",
    borderWidth: 0,
    flex: 7
  },
  waitingHeader: {
    flex: 2,
    borderColor: "black",
    borderWidth: 0,
    fontSize: 25,
    padding: 10,
    justifyContent: "space-evenly",
    alignContent: "center"
  },
  PIN: {
    flex: 3,
    borderColor: "black",
    borderWidth: 0,
    width: "100%",
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  player: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
    borderWidth: 0,
    margin: 13
  },
  text: {
    fontSize: 20,
    fontFamily: "sf-ultralight",
    letterSpacing: 0.7,
    color: "#515151",
    justifyContent: "center",
    borderWidth: 0,
    borderColor: "blue"
  },
  playerText: {
    fontSize: 20,
    fontFamily: "sf-light",
    letterSpacing: 0.9,
    color: "rgba(110, 120, 183, 1.0)",
    marginTop: -20
  },
  welcome: {
    fontSize: 20,
    fontFamily: "sf-ultralight",
    letterSpacing: 0.7,
    color: "#515151",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    borderColor: "black",
    borderWidth: 0
  },
  gameName: {
    fontSize: 30,
    fontFamily: "sf-light",
    letterSpacing: 0.7,
    color: "#515151"
  },
  PINtext: {
    fontSize: 60,
    fontFamily: "sf-regular",
    color: "rgba(95, 187, 148, 1.0)",
    letterSpacing: 5,
    borderColor: "magenta",
    borderWidth: 0,
    justifyContent: "center",
    alignItems: "center",
    margin: 10
  },
  backButton: {
    paddingLeft: 15,
    paddingRight: 10
  },
  headerTitle: {
    color: "white",
    fontSize: 20,
    fontFamily: "sf-light",
    letterSpacing: 0.7,
    width: "100%",
    textAlign: "center"
  },
  button: {
    alignItems: "center",
    backgroundColor: "#7B68BF",
    borderWidth: 0,
    borderRadius: 9,
    padding: 10,
    margin: 30,
    width: 300
  },
  buttonText: {
    color: "white",
    fontSize: 20
  }
});
export default WaitingScreen;

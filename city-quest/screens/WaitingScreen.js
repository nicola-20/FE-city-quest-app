import React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Animated,
  ActivityIndicator
} from "react-native";
import * as api from "../api.js";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

class WaitingScreen extends React.Component {
  //
  state = {
    noOfPlayers: 0,
    playersArray: [],
    gamePin: "",
    gameName: ""
  };
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: <Text style={styles.headerTitle}>Waiting for players</Text>,
      headerLeft: null,
      headerRight: null
    };
  };
  render() {
    const { navigation } = this.props;
    const { playersArray } = this.state;
    const currentPlayers = [];
    for (let i = 0; i < this.state.noOfPlayers; i++) {
      if (playersArray[i]) currentPlayers.push(playersArray[i].playerName);
      else currentPlayers.push(null);
    }

    return (
      <View style={styles.view}>
        <View style={styles.waitingHeader}>
          <Text style={styles.welcome}>Welcome to:</Text>
          <Text style={styles.gameName}>{this.state.gameName}</Text>
        </View>
        <View style={styles.players}>
          {currentPlayers.map((player, index) => {
            return player ? (
              <View style={styles.player} key={index}>
                <MaterialCommunityIcons
                  name="account"
                  size={90}
                  color="rgba(125, 100, 189, 1.0)"
                />
                <Text style={styles.text}>{player}</Text>
              </View>
            ) : (
              <View style={styles.player} key={index}>
                <MaterialCommunityIcons
                  name="account"
                  size={90}
                  color="rgba(125, 100, 189, 0.2)"
                />
              </View>
            );
          })}
        </View>
        <View style={styles.PIN}>
          <Text style={styles.text}>Game PIN:</Text>
          <Text style={styles.PINtext}>{this.state.gamePin}</Text>
        </View>
        <Button
          onPress={() => {
            navigation.navigate("Game");
          }}
          title="Start Game"
          color="#841584"
        />
      </View>
    );
  }

  // createGrid = () => {};
  componentDidMount() {
    const { navigation } = this.props;
    const GamePin = navigation.getParam("GamePin", "this is your game pin");
    api.getGame(GamePin).then(game => {
      this.setState({
        noOfPlayers: game.noOfPlayers,
        playersArray: game.playersArray,
        gamePin: game.gamePin,
        gameName: game.gameName
      });
    });
  }
}
const styles = StyleSheet.create({
  view: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
    borderWidth: 0.5,
    flex: 1
  },
  players: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
    borderWidth: 0.5,
    flex: 1,
    padding: 10
  },
  waitingHeader: {
    // flex: 1,
    borderColor: "black",
    borderWidth: 0.5,
    fontSize: 25,
    padding: 10
  },
  PIN: {
    // flex: 1,
    borderColor: "black",
    borderWidth: 0.5
  },
  player: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    borderColor: "black",
    borderWidth: 0.5
  },
  text: {
    fontSize: 17
  },
  welcome: {
    fontSize: 20
  },
  gameName: {
    fontSize: 30
  },
  PINtext: {
    fontSize: 30,
    color: "rgba(95, 187, 148, 1.0)",
    letterSpacing: 5,
    backgroundColor: "grey"
  },
  backButton: {
    paddingLeft: 15,
    paddingRight: 10
  },
  headerTitle: {
    color: "white",
    fontSize: 20
  },
  button: {
    alignItems: "center",
    backgroundColor: "#7B68BF",
    borderWidth: 0,
    borderRadius: 9,
    // borderColor: "#515151",
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

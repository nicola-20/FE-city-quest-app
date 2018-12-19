import React from "react";
import {
  Text,
  ActivityIndicator,
  View,
  ScrollView,
  StyleSheet
} from "react-native";
import * as api from "../api";

export default class PlayerCompleteScreen extends React.Component {
  state = {
    playerName: this.props.navigation.state.params.playerName,
    gameName: this.props.navigation.state.params.gameName,
    trailName: this.props.navigation.state.params.trail,
    totalTime: this.props.navigation.state.params.totalTime,
    isLoading: true,
    players: []
  };

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: <Text style={styles.headerTitle}>Trail Completed</Text>,
      headerLeft: <Text />,
      headerRight: <Text />
    };
  };

  render() {
    if (this.state.isLoading)
      return (
        <ActivityIndicator
          size="large"
          color="#8360c3"
          style={{ margin: 30 }}
        />
      );
    return (
      <View>
        <Text>
          Congratulations {this.state.playerName}, you have completed the{" "}
          {this.state.trailName} in {this.state.gameName}!! Your total time was{" "}
          {Math.floor(parseInt(this.state.totalTime) / 60000)} minutes.
        </Text>
        <View>
          {this.state.players.map((player, index) => {
            return (
              <View key={index}>
                <Text>{index + 1}</Text>
                <Text>{player.playerName}</Text>
                <Text>{player.totalTime}</Text>
                <Text>{player.trailName}</Text>
              </View>
            )
          })}
        </View>
      </View>
    );
  }
  componentDidMount() {
    const { playerName, trailName, totalTime } = this.state
    api.getAllPlayers().then(players => {
      players.sort((a, b) => {
        if (a.totalTime < b.totalTime) return -1;
        if (a.totalTime > b.totalTime) return 1;
        else return 0;
      });
      players.unshift({ playerName, trailName, totalTime })
      this.setState({
        players: players.slice(0, 5),
        isLoading: false
      });
    });
  }
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

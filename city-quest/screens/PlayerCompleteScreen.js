import React from "react";
import {
  Text,
  ActivityIndicator,
  View,
  StyleSheet,
  TouchableOpacity
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
      <View style={styles.view}>
        <View style={styles.header}>
          <Text
            style={{
              ...styles.text,
              fontFamily: "sf-thin-italic",
              fontSize: 24
            }}
          >
            Congratulations
          </Text>
          <Text style={styles.name}>{this.state.playerName},</Text>
          <Text style={styles.text}>you have finished</Text>
          <Text style={styles.gameName}>"{this.state.gameName}"!!</Text>
          <Text style={styles.text}>You completed the </Text>
          <Text style={styles.trail}>{this.state.trailName}</Text>
          <Text style={styles.text}>
            in{" "}
            <Text style={{ ...styles.text, fontFamily: "sf-light" }}>
              {Math.floor(parseInt(this.state.totalTime) / 60000)}
            </Text>{" "}
            minutes.
          </Text>
        </View>
        <View>
          <View style={styles.player}>
            <Text style={styles.number}>{this.state.index.slice(0, 2)}. </Text>
            <Text style={{ ...styles.playerText, color: "#2EBF91" }}>
              {this.state.playerName}
            </Text>
            <Text style={styles.time}>{Math.floor(parseInt(this.state.totalTime) / 60000)} mins</Text>
          </View>
        </View>
        <View style={styles.leaderboard}>
          {this.state.players.map((player, index) => {
            return (
              <View key={index} style={styles.player}>
                <Text style={styles.number}>{index + 1}. </Text>
                <Text style={styles.playerText}>{player.playerName}</Text>
                <Text style={styles.time}>{player.totalTime} mins</Text>
              </View>
            );
          })}
        </View>
        <View>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("Lobby");
            }}
            style={styles.button}
          >
            <Text
              adjustsFontSizeToFit
              numberOfLines={1}
              style={styles.buttonText}
            >
              Play again
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  componentDidMount() {
    const { playerName, trailName, totalTime } = this.state;
    api.getAllPlayers().then(players => {
      players.sort((a, b) => {
        if (a.totalTime < b.totalTime) return -1;
        if (a.totalTime > b.totalTime) return 1;
        else return 0;
      });
      const index = players.map((player, index) => {
        if (player.playerName === playerName) return index;
      });
      this.setState({
        players: players.slice(0, 3),
        isLoading: false,
        index
      });
    });
  }
}

const styles = StyleSheet.create({
  view: {
    borderColor: "black",
    borderWidth: 0,
    flex: 1,
    fontFamily: "sf-thin",
    justifyContent: "center",
    alignItems: "center"
  },
  header: {
    borderColor: "black",
    borderWidth: 0,
    padding: 10,
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "80%",
    marginTop: 10
  },
  text: {
    fontSize: 18,
    fontFamily: "sf-thin",
    letterSpacing: 0.7,
    color: "#515151",
    justifyContent: "center",
    borderWidth: 0,
    borderColor: "blue",
    margin: 5
  },
  name: {
    fontSize: 25,
    fontFamily: "sf-light",
    letterSpacing: 0.7,
    color: "#8360C3",
    justifyContent: "center",
    borderWidth: 0,
    borderColor: "blue"
  },
  gameName: {
    fontSize: 24,
    fontFamily: "sf-light",
    letterSpacing: 0.7,
    color: "#2EBF91"
  },
  trail: {
    fontSize: 25,
    fontFamily: "sf-light",
    letterSpacing: 0.7,
    color: "#8360C3"
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
    width: "50%"
  },
  buttonText: {
    fontFamily: "sf-light",
    letterSpacing: 1,
    color: "white",
    fontSize: 20
  },
  player: {
    borderColor: "black",
    borderWidth: 0,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    marginTop: 15,
    width: "80%"
  },
  playerText: {
    fontFamily: "sf-light",
    fontSize: 22,
    letterSpacing: 2,
    borderColor: "yellow",
    borderWidth: 0,
    color: "#515151"
  },
  number: {
    fontFamily: "sf-thin",
    fontSize: 20,
    letterSpacing: 1,
    borderColor: "yellow",
    borderWidth: 0,
    width: "11%",
    color: "#515151"
  },
  time: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "flex-end",
    alignContent: "center",
    fontFamily: "sf-thin",
    fontSize: 20,
    letterSpacing: 1,
    borderColor: "yellow",
    borderWidth: 0,
    textAlign: "right",
    color: "#515151"
  }
});

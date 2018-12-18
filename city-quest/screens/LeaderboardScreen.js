import React from "react";
import {
  Text,
  ActivityIndicator,
  View,
  ScrollView,
  StyleSheet
} from "react-native";
import * as api from "../api";

class LeaderboardScreen extends React.Component {
  state = {
    isLoading: true,
    players: []
  };
  // get api/players - returns list of players and times in ms
  render() {
    console.log(this.props.navigation.state, "inside question screen");
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
        style={styles.container}
        contentContainerStyle={{ flex: 1, alignItems: "center" }}
      >
        <View style={styles.heading}>
          <Text style={styles.title}>Leaderboard</Text>
        </View>
        <View style={styles.leaders}>
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
      </ScrollView>
    );
  }
  componentDidMount() {
    api.getAllPlayers().then(players => {
      console.log(players);
      players.sort((a, b) => {
        if (a.totalTime < b.totalTime) return -1;
        if (a.totalTime > b.totalTime) return 1;
        else return 0;
      });
      this.setState({
        players,
        isLoading: false
      });
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: "red",
    borderWidth: 0.5
  },
  heading: {
    borderColor: "blue",
    borderWidth: 0.5,
    justifyContent: "center",
    alignItems: "center",
    width: "80%"
  },
  leaders: {
    borderColor: "green",
    borderWidth: 0.5,
    width: "80%"
  },
  player: {
    borderColor: "black",
    borderWidth: 0.5,
    display: "flex",
    flexDirection: "row",
    justifyContent: 'center',
    alignContent: 'center',
    marginTop: 20
  },
  title: {
    fontFamily: "sf-ultralight",
    fontSize: 40,
    color: '#8360C3',
    letterSpacing: 2,
    borderColor: "magenta",
    borderWidth: 0.5,
    marginTop: 20,
    marginBottom: 20
  },
  playerText: {
    fontFamily: "sf-light",
    fontSize: 24,
    letterSpacing: 2,
    borderColor: "yellow",
    borderWidth: 0.5,
    color: '#515151'
  },
  number: {
    fontFamily: "sf-thin",
    fontSize: 24,
    letterSpacing: 1,
    borderColor: "yellow",
    borderWidth: 0.5,
    width: '9%',
    color: '#515151'
  },
  time: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'flex-end',
    alignContent: 'center',
    fontFamily: "sf-thin",
    fontSize: 20,
    letterSpacing: 1,
    borderColor: "yellow",
    borderWidth: 0.5,
    textAlign: 'right',
    // position: 'relative',
    // right: -100,
    color: '#515151'

  }
});
export default LeaderboardScreen;

import React from "react";
import {
  Text,
  ActivityIndicator,
  View,
  FlatList,
  StyleSheet
} from "react-native";
import * as api from "../api";

class LeaderboardScreen extends React.Component {
  state = {
    isLoading: true,
    players: []
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
      <View style={styles.container}>
        <View style={styles.heading}>
          <Text style={styles.title}>Leaderboard</Text>
        </View>
        <View style={styles.leaders}>
          <FlatList
            data={[...this.state.players]}
            contentContainerStyle={{
              alignItems: "center"
            }}
            style={{ width: "100%", marginBottom: 30 }}
            keyExtractor={(item, index) => `${index}`}
            renderItem={({ item, index }) => (
              <View style={styles.player}>
                <Text style={styles.number}>{index + 1}. </Text>
                <Text style={styles.playerText}>{item.playerName}</Text>
                <Text style={styles.time}>{item.totalTime} mins</Text>
              </View>
            )}
          />
        </View>
      </View>
    );
  }
  componentDidMount() {
    api
      .getAllPlayers()
      .then(players => {
        players.sort((a, b) => {
          if (a.totalTime < b.totalTime) return -1;
          if (a.totalTime > b.totalTime) return 1;
          else return 0;
        });
        this.setState({
          players,
          isLoading: false
        });
      })
      .catch(err => {
        this.props.navigation.navigate("ErrorScreen", {
          msg: "No players",
          err
        });
      });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "red",
    borderWidth: 0,
    paddingBottom: 60
  },
  heading: {
    borderColor: "blue",
    borderWidth: 0,
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    marginTop: 40
  },
  leaders: {
    borderColor: "green",
    borderWidth: 0,
    width: "100%"
  },
  player: {
    borderColor: "black",
    borderWidth: 0,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    marginTop: 20,
    width: "80%"
  },
  title: {
    fontFamily: "sf-light",
    fontSize: 40,
    color: "#8360C3",
    letterSpacing: 2,
    borderColor: "magenta",
    borderWidth: 0,
    marginTop: 60,
    marginBottom: 20
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
export default LeaderboardScreen;

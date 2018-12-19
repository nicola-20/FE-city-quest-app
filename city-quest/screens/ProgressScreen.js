import React from "react";
import { Text, View } from "react-native";
import ProgressCircle from "react-native-progress-circle";
import PercentageCircle from "react-native-percentage-circle";
import * as api from "../api";

class ProgressScreen extends React.Component {
  state = {
    game: this.props.navigation.state.params.game,
    currentPlayer: this.props.navigation.state.params.playerName,
    trail: this.props.navigation.state.params.trail
  };
  render() {
    // const game = this.props.navigation.state.params.game;
    const game = this.state.game;
    const trail = this.state.trail;
    // const trail = this.props.navigation.state.params.trail;
    // const currentPlayer = this.props.navigation.state.params.playerName;
    // const { game, currentPlayer, trail } = this.state
    const players = game.playersArray;
    const route = trail.route;
    const trailLength = route.length;
    return (
      <View style={styles.progressScreen}>
        <Text style={styles.title}>Player Progress</Text>
        <View style={styles.progress}>
          {players.map((player, index) => {
            let playerPercent = Math.floor(
              (player.progress / trailLength) * 100
            );
            // playerPercent === 100 ? alert(`${player.playerName} won the game!!`) : ""
            return (
              <View key={index} style={styles.player}>
                {/* <ProgressCircle
                  percent={playerPercent}
                  radius={60}
                  borderWidth={15}
                  color={
                    player.playerName === this.state.currentPlayer
                      ? "rgba(46, 191, 145, 1.0)"
                      : "rgba(110, 120, 183, 1.0)"
                  }
                  shadowColor={
                    player.playerName === this.state.currentPlayer
                      ? "rgba(46, 191, 145, 0.2)"
                      : "rgba(110, 120, 183, 0.2)"
                  }
                  bgColor="white"
                >
                  <Text style={styles.text}>
                    {player.playerName === this.state.currentPlayer
                      ? "You"
                      : player.playerName}
                  </Text>
                  <Text style={styles.percentText}>
                    {playerPercent === 100
                      ? "Completed!"
                      : `${player.progress}/${trailLength}`}
                  </Text>
                </ProgressCircle> */}

                <PercentageCircle
                  radius={60}
                  percent={playerPercent}
                  color={
                    player.playerName === this.state.currentPlayer
                      ? "rgba(46, 191, 145, 1.0)"
                      : "rgba(110, 120, 183, 1.0)"
                  }
                  bgcolor={
                    player.playerName === this.state.currentPlayer
                      ? "rgba(46, 191, 145, 0.2)"
                      : "rgba(110, 120, 183, 0.2)"
                  }
                  innerColor={"white"}
                  borderWidth={15}
                >
                  <Text style={styles.text}>
                    {player.playerName === this.state.currentPlayer
                      ? "You"
                      : player.playerName}
                  </Text>
                  <Text style={styles.percentText}>
                    {playerPercent === 100
                      ? "Completed!"
                      : `${player.progress}/${trailLength}`}
                  </Text>
                </PercentageCircle>
              </View>
            );
          })}
        </View>
      </View>
    );
  }

  componentWillMount() {
    const trail = this.props.navigation.state.params.trail;
    const currentPlayer = this.props.navigation.state.params.playerName;
    const Pin = this.props.navigation.state.params.game.gamePin;
    const intervalID = setInterval(this.updateProgress, 30000);
    api.getGame(Pin).then(game => {
      this.setState({
        game,
        trail,
        currentPlayer,
        intervalID
      });
    })
      .catch(err => {
        this.props.navigation.navigate("ErrorScreen", {
          msg: "Couldn't update",
          err
        });
      })
  }
  // componentDidMount() {
  //   const Pin = this.props.navigation.state.params.game.gamePin;
  //   const intervalID = setInterval(this.updateProgress, 2000)
  //   this.setState({
  //     intervalID
  //   })
  // }

  componentWillUnmount = () => {
    clearInterval(this.state.intervalID);
  };

  updateProgress = () => {
    const Pin = this.props.navigation.state.params.game.gamePin;
    api.getGame(Pin)
      .then(game => {
        this.setState({
          game
        });
      })
      .catch(err => {
        this.props.navigation.navigate("ErrorScreen", {
          msg: "Couldn't update",
          err
        });
      })
  };
}
export default ProgressScreen;

const styles = {
  progressScreen: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "red",
    borderWidth: 0,
    height: "100%"
  },
  progress: {
    flex: 6,
    width: "100%",
    height: "100%",
    borderColor: "red",
    borderWidth: 0,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly"
  },
  player: {
    borderColor: "black",
    borderWidth: 0,
    marginBottom: 60,
    marginTop: 10
  },
  text: {
    fontFamily: "sf-thin",
    fontSize: 18,
    color: "#515151"
  },
  title: {
    flex: 1,
    fontFamily: "sf-light",
    letterSpacing: 0.7,
    fontSize: 25,
    color: "#515151",
    textAlign: "center",
    justifyContent: "center",
    textAlignVertical: "center",
    alignItems: "center",
    alignContent: "center",
    borderColor: "blue",
    borderWidth: 0,
    paddingTop: 20,
    marginBottom: 0
  },
  percentText: {
    fontFamily: "sf-regular",
    fontSize: 20,
    color: "#515151"
  }
};

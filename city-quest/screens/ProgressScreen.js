import React from "react";
import { Text, View } from "react-native";
import ProgressCircle from "react-native-progress-circle";
import * as api from "../api";

class ProgressScreen extends React.Component {
  state = {
    game: this.props.navigation.state.params.game,
    currentPlayer: this.props.navigation.state.params.playerName,
    trail: this.props.navigation.state.params.trail
  };
  render() {
    console.log(this.state.trail, "TRAIL");
    // const game = this.props.navigation.state.params.game;
    const game = this.state.game;
    const trail = this.state.trail;
    // const trail = this.props.navigation.state.params.trail;
    // const currentPlayer = this.props.navigation.state.params.playerName;
    // const { game, currentPlayer, trail } = this.state
    // console.log(this.props.navigation.state, "inside question screen");
    const players = game.playersArray;
    const route = trail.route;
    console.log(typeof route);
    const trailLength = route.length;
    return (
      <View style={styles.progressScreen}>
        <View style={styles.progress}>
          {players.map((player, index) => {
            let playerPercent = Math.floor(
              (player.progress / trailLength) * 100
            );
            return (
              <View key={index} style={styles.player}>
                <ProgressCircle
                  percent={playerPercent}
                  radius={60}
                  borderWidth={20}
                  color={
                    player.playerName === this.state.currentPlayer
                      ? "rgba(46,191,145, 1.0)"
                      : "rgba(131,96,195, 1.0)"
                  }
                  shadowColor="#515151"
                  bgColor="white"
                >
                  <Text style={{ fontSize: 18, color: "#515151" }}>
                    {player.playerName === this.state.currentPlayer
                      ? "You"
                      : player.playerName}
                  </Text>
                  <Text style={{ fontSize: 18, color: "#515151" }}>
                    {playerPercent}%
                  </Text>
                </ProgressCircle>
              </View>
            );
          })}
        </View>
      </View>
    );
  }
  componentWillMount() {
    // console.log(
    //   this.props.navigation.state.params,
    //   "params inside progress screen"
    // );
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
    });
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
    api.getGame(Pin).then(game => {
      this.setState({
        game
      });
    });
  };
}
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
    width: "100%",
    height: "100%",
    borderColor: "blue",
    borderWidth: 0,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly"
  },
  player: {
    borderColor: "black",
    borderWidth: 0.5,
    marginTop: 70
  }
};
export default ProgressScreen;

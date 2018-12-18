import React from "react";
import { Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import * as api from "../api";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

class QuestionScreen extends React.Component {
  state = {
    challenge: "",
    answer: "",
    playerAnswer: "",
    progress: 0
  };
  render() {
    const { challenge, answer } = this.state;
    console.log(challenge);
    return (
      <KeyboardAwareScrollView
        // ref={ref => (this.scroll = ref)}
        style={styles.container}
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "space-evenly"
        }}
        // enableOnAndroid
        // extraHeight={Platform.OS === "android" ? 10 : undefined}
      >
        <Text adjustsFontSizeToFit numberOfLines={2} style={styles.text}>
          {challenge}
        </Text>
        <TextInput
          // onFocus={this.handleOnFocus}
          style={styles.input}
          placeholder="Answer"
          onChangeText={text => {
            this.setState({ playerAnswer: text });
          }}
        />
        <TouchableOpacity onPress={this.handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        {/* <Animated.View style={{ height: this.state.keyboardHeight }} /> */}
      </KeyboardAwareScrollView>
    );
  }
  componentDidMount() {
    console.log("got here");
    const { gamePin } = this.props.navigation.state.params.game;
    const { trail } = this.props.navigation.state.params;
    api.getGame(gamePin).then(game => {
      const currentPlayer = game.playersArray.filter(player => {
        return player.playerName === game.playerName;
      });
      console.log(trail, "Route!!!");
      // console.log(this.props.navigation.state.params);
      // const progress = currentPlayer[0].progress;
      const progress = 0; // temporary fix
      const challengeId = trail.route[progress].challengeId;
      api
        .getChallenge(challengeId)
        .then(challenge => {
          console.log(challenge, "CHALLENGE!!");
          if (challenge.challengeType === "question") {
            this.setState({
              challenge: challenge.question,
              answer: challenge.answer,
              progress: progress
            });
          }
        })
        .catch(console.log);
    });
  }
  handleSubmit = () => {
    const { game } = this.props.navigation.state.params;
    const { trail } = this.props.navigation.state.params;
    const { answer, playerAnswer } = this.state;
    if (answer === playerAnswer) {
      // render the next location and switch to map screen
      // get next question?
      if (trail.route.length - 1 === progress) {
        api.updatePlayer(game.gamePin, "advance=true&&end=true").then(() => {});
      } else {
        api.updatePlayer(game.gamePin, "advance=true").then(() => {});
      }
    }
    // api.createPlayer(PlayerName, GamePin).then(PlayerName => {
    //   this.props.navigation.navigate("Waiting", {
    //     GamePin: GamePin,
    //     PlayerName: PlayerName
    //   });
    // });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: "black",
    borderWidth: 0
  },
  text: {
    width: "80%",
    fontFamily: "sf-light",
    fontSize: 20,
    color: "black",
    marginTop: 60
  },
  input: {
    borderColor: "#515151",
    borderWidth: 0.7,
    borderRadius: 12,
    width: "80%",
    fontSize: 22,
    padding: 10,
    fontFamily: "sf-thin",
    letterSpacing: 0.5,
    color: "#515151",
    marginTop: 60
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#8360c3",
    borderWidth: 0,
    borderRadius: 9,
    padding: 10,
    width: "30%",
    marginTop: 60
  },
  buttonText: {
    color: "white",
    fontSize: 22,
    fontFamily: "sf-thin",
    letterSpacing: 1
  }
});

export default QuestionScreen;

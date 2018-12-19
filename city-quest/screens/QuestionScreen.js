import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Image
} from "react-native";
import { DocumentPicker, ImagePicker, Permissions } from "expo";
import * as firebase from "firebase";
import * as api from "../api";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const firebaseConfig = {
  apiKey: "AIzaSyCNArqiZbX3ChYKYMEeGLom-ieH-yk6Jvg",
  authDomain: "treasure-hunt-dcd8e.firebaseapp.com",
  databaseURL: "https://treasure-hunt-dcd8e.firebaseio.com",
  projectId: "treasure-hunt-dcd8e",
  storageBucket: "treasure-hunt-dcd8e.appspot.com",
  messagingSenderId: "382195712102"
};

firebase.initializeApp(firebaseConfig);

class QuestionScreen extends React.Component {
  state = {
    challenge: "",
    answer: "",
    playerAnswer: "",
    progress: 0,
    isLoading: true,
    playerName: "",
    challengeType: "",
    analysis: {},
    image: null
  };

  render() {
    const { challenge, answer, image } = this.state;
    if (this.state.isLoading)
      return (
        <ActivityIndicator
          size="large"
          color="#8360c3"
          style={{ margin: 30 }}
        />
      );
    if (this.state.challengeType === "question") {
      return (
        <KeyboardAwareScrollView
          style={styles.container}
          contentContainerStyle={{
            alignItems: "center",
            justifyContent: "space-evenly"
          }}
        >
          <Text>
            {
              this.props.navigation.state.params.trail.route[
                this.state.progress
              ].name
            }
          </Text>
          <Text adjustsFontSizeToFit numberOfLines={2} style={styles.text}>
            {challenge}
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Player Answer"
            value={this.state.playerAnswer}
            onChangeText={text => {
              this.setState({ playerAnswer: text });
            }}
          />
          <TouchableOpacity onPress={this.handleSubmit} style={styles.button}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      );
    } else if (this.state.challengeType === "image") {
      return (
        <KeyboardAwareScrollView
          style={styles.container}
          contentContainerStyle={{
            alignItems: "center",
            justifyContent: "space-evenly"
          }}
        >
          <Text>
            {
              this.props.navigation.state.params.trail.route[
                this.state.progress
              ].name
            }
          </Text>
          <Text adjustsFontSizeToFit numberOfLines={2} style={styles.text}>
            {challenge}
          </Text>
          {/* Photo Picker Component */}
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <TouchableOpacity
              onPress={this.pickImage}
              style={{
                height: 50,
                width: "80%",
                borderWidth: 0.5,
                borderColor: "black",
                padding: 10,
                margin: 20
              }}
            >
              <Text>Pick an image from camera roll</Text>
            </TouchableOpacity>
            {image && (
              <Image
                source={{ uri: image }}
                style={{ width: 200, height: 200 }}
              />
            )}
            <TouchableOpacity
              onPress={this.takeImage}
              style={{
                height: 50,
                width: "80%",
                borderWidth: 0.5,
                borderColor: "black",
                padding: 10,
                margin: 20
              }}
            >
              <Text>Take a new image</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={this.handleSubmitPhoto}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      );
    }
  }
  getCurrentChallenge = () => {
    const { gamePin } = this.props.navigation.state.params.game;
    const { trail } = this.props.navigation.state.params;
    const playerName = this.props.navigation.state.params.playerName;
    api.getGame(gamePin)
      .then(game => {
        const currentPlayer = game.playersArray.filter(player => {
          return player.playerName === playerName;
        });
        const progress = currentPlayer[0].progress;
        const challengeId = trail.route[progress].challengeId;
        api
          .getChallenge(challengeId)
          .then(challenge => {
            if (challenge.challengeType === "question") {
              this.setState({
                playerName,
                challengeType: challenge.challengeType,
                challenge: challenge.challenge,
                answer: challenge.answer,
                progress: progress,
                isLoading: false,
                playerAnswer: ""
              });
            } else if (challenge.challengeType === "image") {
              this.setState({
                playerName,
                challengeType: challenge.challengeType,
                challenge: challenge.challenge,
                analysis: challenge.analysis,
                progress: progress,
                isLoading: false,
                playerAnswer: ""
              });
            }
          })
          .catch(err => {
            this.props.navigation.navigate("ErrorScreen", {
              msg: "Couldn't get question",
              err
            });
          })
      });
  };
  componentDidMount() {
    this.getCurrentChallenge();
  }

  takeImage = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    if (status !== "granted") {
      throw new Error("Denied CAMERA permissions!");
    }

    const result = await ImagePicker.launchCameraAsync();
    if (!result.cancelled) {
      this.setState({
        image: result.uri
      });
    }
  };

  pickImage = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== "granted") {
      throw new Error("Denied CAMERA_ROLL permissions!");
    }
    const result = await ImagePicker.launchImageLibraryAsync();

    if (!result.cancelled) {
      this.setState({
        image: result.uri
      });
    }
  };

  uploadImageAsync = async uri => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    const ref = firebase
      .storage()
      .ref()
      .child("image57625o");
    const snapshot = await ref.put(blob);
    blob.close();

    return await snapshot.ref.getDownloadURL();
  };

  handleSubmit = () => {
    const { game } = this.props.navigation.state.params;
    const { trail } = this.props.navigation.state.params;
    const { answer, playerAnswer, progress, playerName } = this.state;
    if (answer.toLowerCase().trim() === playerAnswer.toLowerCase().trim()) {
      if (trail.route.length - 1 === progress) {
        api
          .updatePlayer(game.gamePin, "advance=true&&end=true", playerName)
          .then(() => {
            alert("game over");
          });
      } else {
        api
          .updatePlayer(game.gamePin, "advance=true", playerName)
          .then(() => {
            this.getCurrentChallenge();
          })
          .then(() => {
            this.props.navigation.navigate("Map", {
              progress: this.state.progress + 1
            });
          });

      }
    } else {
      alert("Wrong answer, try again!");
    }
  };


  handleSubmitPhoto = async () => {
    const { game } = this.props.navigation.state.params;
    const { trail } = this.props.navigation.state.params;
    const { progress, playerName, analysis } = this.state;
    const gamePin = this.props.navigation.state.params.game.gamePin;
    const uploadUrl = await this.uploadImageAsync(this.state.image);
    api.analyseImage(gamePin, playerName, uploadUrl).then(result => {
      this.setState({
        playerImageAnalysis: result
      });
      const answerKeys = Object.keys(analysis);
      console.log(answerKeys, 'answerkeys')
      const playerKeys = Object.keys(result);
      console.log(playerKeys, 'playerkeys')
      let count = 0;
      for (let i = 0; i < answerKeys.length; i++) {
        for (let j = 0; j < playerKeys.length; j++) {
          if (answerKeys[i] === playerKeys[j]) {
            count++;
          }
        }
      }
      console.log(count, 'count')
      if (count >= 3) {
        if (trail.route.length - 1 === progress) {
          api
            .updatePlayer(game.gamePin, "advance=true&&end=true", playerName)
            .then(() => {
              alert("game over");
            });
        } else {
          api
            .updatePlayer(game.gamePin, "advance=true", playerName)
            .then(() => {
              this.getCurrentChallenge();
            });
        }
      } else {
        alert("Wrong answer, try again!");
      }
    });
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

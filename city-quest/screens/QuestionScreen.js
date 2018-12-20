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
import { ImagePicker, Permissions } from "expo";
import * as firebase from "firebase";
import * as api from "../api";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { AntDesign } from "@expo/vector-icons";

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
    image: null,
    analysing: false
  };

  render() {
    const { challenge, image, analysing } = this.state;
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
          <View style={styles.title}>
            <Text style={styles.welcome}>Welcome to</Text>
            <Text
              adjustsFontSizeToFit
              numberOfLines={1}
              style={styles.locationName}
            >
              {
                this.props.navigation.state.params.trail.route[
                  this.state.progress
                ].name
              }
            </Text>
          </View>
          <Text adjustsFontSizeToFit numberOfLines={3} style={styles.text}>
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
          <View style={styles.title}>
            <Text style={styles.welcome}>Welcome to</Text>
            <Text
              adjustsFontSizeToFit
              numberOfLines={1}
              style={styles.locationName}
            >
              {
                this.props.navigation.state.params.trail.route[
                  this.state.progress
                ].name
              }
            </Text>
          </View>
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Text adjustsFontSizeToFit numberOfLines={3} style={styles.text}>
              {challenge}
            </Text>
          </View>
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <TouchableOpacity
              onPress={this.takeImage}
              style={styles.imageButton}
            >
              <Text
                style={{ borderColor: "black", borderWidth: 0, padding: -5 }}
              >
                <AntDesign name="camera" size={70} color="white" />
              </Text>
              <Text style={styles.buttonText}>Take photo</Text>
            </TouchableOpacity>
            {image && (
              <Image
                source={{ uri: image }}
                style={{ width: 200, height: 200, margin: 10, borderRadius: 9}}
              />
            )}
            {analysing && <ActivityIndicator size="large" color="#8360c3" />}
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
    api.getGame(gamePin).then(game => {
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
        });
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
    const { playerName, progress } = this.state;
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function(e) {
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
      .child(`${playerName}${progress}`);
    const snapshot = await ref.put(blob);
    blob.close();
    return await snapshot.ref.getDownloadURL();
  };

  handleSubmit = () => {
    const { game } = this.props.navigation.state.params;
    const { trail } = this.props.navigation.state.params;
    const trailName = trail.name;
    const { answer, playerAnswer, progress, playerName } = this.state;
    if (answer.toLowerCase().trim() === playerAnswer.toLowerCase().trim()) {
      if (trail.route.length - 1 === progress) {
        api
          .updatePlayer(game.gamePin, "end=true", playerName)
          .then(() => {
            return api.getGame(game.gamePin);
          })
          .then(game => {
            const { playersArray } = game;
            const totalTime = playersArray.reduce((acc, player) => {
              if (player.playerName === playerName) {
                return (acc += player.totalTime);
              } else return acc;
            }, "");
            if (
              playersArray.every(player => {
                return player.totalTime;
              })
            ) {
              api
                .completeTrail(playerName, totalTime, trailName)
                .then(() => {
                  return api.endGame(game.gamePin);
                })
                .then(() => {
                  this.props.navigation.navigate("PlayerCompleteScreen", {
                    gameName: game.gameName,
                    gamePin: game.gamePin,
                    trail: trail.name,
                    playerName,
                    totalTime
                  });
                });
            } else {
              api.completeTrail(playerName, totalTime, trailName).then(() => {
                this.props.navigation.navigate("PlayerCompleteScreen", {
                  gameName: game.gameName,
                  gamePin: game.gamePin,
                  trail: trail.name,
                  playerName,
                  totalTime
                });
              });
            }
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
    this.setState({ analysing: true });
    const { game } = this.props.navigation.state.params;
    const { trail } = this.props.navigation.state.params;
    const { progress, playerName, analysis } = this.state;
    const gamePin = this.props.navigation.state.params.game.gamePin;
    const uploadUrl = await this.uploadImageAsync(this.state.image);
    api
      .analyseImage(gamePin, playerName, uploadUrl)
      .catch(err => {
        this.props.navigation.navigate("ErrorScreen", {
          msg: "Couldn't get question",
          err
        });
      })
      .then(result => {
        this.setState({
          playerImageAnalysis: result,
          analysing: false
        });
        const answerKeys = Object.keys(analysis);
        const playerKeys = Object.keys(result);
        let count = 0;
        for (let i = 0; i < answerKeys.length; i++) {
          for (let j = 0; j < playerKeys.length; j++) {
            if (answerKeys[i] === playerKeys[j]) {
              count++;
            }
          }
        }
        if (count >= 3) {
          if (trail.route.length - 1 === progress) {
            api
              .updatePlayer(game.gamePin, "end=true", playerName)
              .then(() => {
                return api.getGame(game.gamePin);
              })
              .then(game => {
                const { playersArray } = game;
                const totalTime = playersArray.reduce((acc, player) => {
                  if (player.playerName === playerName) {
                    return (acc += player.totalTime);
                  } else return acc;
                }, "");
                if (
                  playersArray.every(player => {
                    return player.totalTime;
                  })
                ) {
                  api
                    .completeTrail(playerName, totalTime, trailName)
                    .then(() => {
                      return api.endGame(game.gamePin);
                    })
                    .then(() => {
                      this.props.navigation.navigate("PlayerCompleteScreen", {
                        gameName: game.gameName,
                        gamePin: game.gamePin,
                        trail: trail.name,
                        playerName,
                        totalTime
                      });
                    });
                } else {
                  api
                    .completeTrail(playerName, totalTime, trailName)
                    .then(() => {
                      this.props.navigation.navigate("PlayerCompleteScreen", {
                        gameName: game.gameName,
                        gamePin: game.gamePin,
                        trail: trail.name,
                        playerName,
                        totalTime
                      });
                    });
                }
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
    color: "#515151",
    marginTop: 30,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    textAlign: "center",
    borderColor: "black",
    borderWidth: 0
  },
  title: {
    width: "80%",
    alignItems: "center",
    justifyContent: "center"
  },
  welcome: {
    fontFamily: "sf-thin",
    fontSize: 20,
    color: "#515151",
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center"
  },
  locationName: {
    fontFamily: "sf-light",
    fontSize: 26,
    letterSpacing: 1,
    color: "#8360c3",
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center"
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
    width: "40%",
    margin: 30
  },
  imageButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#43A79E",
    borderWidth: 0,
    borderRadius: 9,
    padding: 10,
    width: "50%",
    margin: 10
  },
  buttonText: {
    color: "white",
    fontSize: 22,
    fontFamily: "sf-thin",
    letterSpacing: 1
  }
});

export default QuestionScreen;

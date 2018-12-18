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
import { storage } from "../firebase";
import * as api from "../api";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import PhotoPicker from "./PhotoPicker";

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
  componentDidMount() {
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
              isLoading: false
            });
          } else if (challenge.challengeType === "image") {
            this.setState({
              playerName,
              challengeType: challenge.challengeType,
              challenge: challenge.challenge,
              analysis: challenge.analysis,
              progress: progress,
              isLoading: false
            });
          }
        })
        .catch(console.log);
    });
  }

  takeImage = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    if (status !== "granted") {
      throw new Error("Denied CAMERA permissions!");
    }
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: "Images"
    });
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
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "Images"
    });
    if (!result.cancelled) {
      this.setState({
        image: result.uri
      });
    }
  };

  postPicture = () => {
    const imageName = `${this.state.playerName}${this.state.progress}`
    // const uri = this.state.image;
    const { image } = this.state;
    const uploadTask = storage.ref(`images/${imageName}`).put(image);
    uploadTask.on(
      "state_changed",
      snapshot => {
        // progress function
      },
      error => {
        console.log(error); //complete function
      },
      () => {
        //complete function
        storage
          .ref("images")
          .child(imageName)
          .getDownloadURL()
          .then(url => {
            console.log(url, "URL");
            this.props.setURL(url);
          });
      }
    );
  };

  handleSubmit = () => {
    const { game } = this.props.navigation.state.params;
    const { trail } = this.props.navigation.state.params;
    const { answer, playerAnswer, progress, playerName } = this.state;
    if (answer.toLowerCase() === playerAnswer.toLowerCase()) {
      // render the next location and switch to map screen
      // get next question?
      if (trail.route.length - 1 === progress) {
        api
          .updatePlayer(game.gamePin, "advance=true&&end=true", playerName)
          .then(() => {});
      } else {
        api
          .updatePlayer(game.gamePin, "advance=true", playerName)
          .then(() => {});
      }
    }
  };
  handleSubmitPhoto = () => {
    // this.postPicture()
    // call postPhoto
    // which needs to return analysis
    // compare analysis
    const gamePin = this.props.navigation.state.params.game.gamePin
    console.log(gamePin, 'GamePin')
    const playerName = this.state.playerName
    console.log(playerName, 'playerName')
    // const url = this.state.image
    const url = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/John_Bright.jpg/220px-John_Bright.jpg"
    api.analyseImage(gamePin, playerName, url)
    .then((result) => {
      console.log(result, 'rsult')
    })
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

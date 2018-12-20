import React, { Component } from "react";
import {
  Animated,
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  Platform
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Ionicons } from "@expo/vector-icons";
import * as api from "../api.js";

class JoinGameScreen extends Component {
  state = {
    PlayerName: "",
    GamePin: "",
    keyboardHeight: new Animated.Value(0)
  };

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: <Text style={styles.headerTitle}>Join Game</Text>,
      headerLeft: (
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate("Lobby")}
        >
          <Ionicons name="ios-arrow-back" size={32} color="white" />
        </TouchableOpacity>
      ),
      headerRight: <Text />
    };
  };

  render() {
    return (
      <KeyboardAwareScrollView
        ref={ref => (this.scroll = ref)}
        style={styles.container}
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "space-evenly"
        }}
        enableOnAndroid
        extraHeight={Platform.OS === "android" ? 10 : undefined}
      >
        <Text adjustsFontSizeToFit numberOfLines={2} style={styles.text}>
          To join a game, enter the invitation PIN and your name below:
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Game PIN"
          onChangeText={text => {
            this.setState({ GamePin: text });
          }}
        />
        <TextInput
          style={styles.input}
          placeholder="Your name here"
          returnKeyType="join"
          returnKeyLabel="join"
          onSubmitEditing={this.handleJoin}
          onChangeText={text => {
            this.setState({ PlayerName: text });
          }}
        />
        <TouchableOpacity onPress={this.handleJoin} style={styles.button}>
          <Text style={styles.buttonText}>Join</Text>
        </TouchableOpacity>
        <Animated.View style={{ height: this.state.keyboardHeight }} />
      </KeyboardAwareScrollView>
    );
  }

  animateKeyboardHeight = (toValue, duration) => {
    Animated.timing(this.state.keyboardHeight, { toValue, duration }).start();
  };

  componentWillMount() {
    if (Platform.OS === "android") {
      this.keyboardShowListener = Keyboard.addListener(
        "keyboardDidShow",
        ({ endCoordinates }) => {
          this.animateKeyboardHeight(endCoordinates.height, 0);
        }
      );
      this.keyboardHideListener = Keyboard.addListener(
        "keyboardDidHide",
        () => {
          this.animateKeyboardHeight(0, 300);
        }
      );
    }
  }
  handleJoin = () => {
    const { GamePin, PlayerName } = this.state;
    console.log(GamePin);
    api
      .createPlayer(PlayerName, GamePin)
      .then(PlayerName => {
        this.props.navigation.navigate("Waiting", {
          GamePin: GamePin,
          PlayerName: PlayerName
        });
      })
      .catch(err => {
        console.log(err);
        this.props.navigation.navigate("ErrorScreen", {
          msg: "Cannot create player",
          err
        });
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
    marginTop: 60
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

export default JoinGameScreen;

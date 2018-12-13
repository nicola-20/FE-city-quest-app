import React from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  TextInput
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Ionicons } from "@expo/vector-icons";
import * as api from '../api.js'

class JoinGameScreen extends React.Component {
  state = {
    PlayerName: "",
    GamePIN: ""
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
      headerRight: null
    };
  };
  render() {
    // console.log(this.state);
    const { navigation } = this.props;
    return (
      <KeyboardAwareScrollView
        contentContainerStyle={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center"
        }}
        enableOnAndroid={true}
      >
        <TextInput
          style={styles.input}
          placeholder="Game PIN"
          onChangeText={text => {
            this.setState({ GamePIN: text });
          }}
        />
        <TextInput
          style={styles.input}
          placeholder="Your name here"
          onClick={() => {
            this.scroll.props.scrollToPosition(5, 5);
          }}
          returnKeyType="join"
          onSubmitEditing={this.handleJoin}
          onChangeText={text => {
            this.setState({ PlayerName: text });
          }}
        />
        <TouchableOpacity
          onPress={this.handleJoin}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Join</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    );
  }

  handleJoin = () => {
    //api request here .then navigate // frisby
    this.props.navigation.navigate("Waiting")
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  backButton: {
    paddingLeft: 15,
    paddingRight: 10
  },
  headerTitle: {
    color: "white",
    fontSize: 20
  },
  input: {
    margin: 30,
    borderColor: "#515151",
    borderWidth: 0.5,
    borderRadius: 12,
    width: 250,
    fontSize: 20,
    padding: 10
  },
  button: {
    alignItems: "center",
    backgroundColor: "#7B68BF",
    borderWidth: 0,
    borderRadius: 12,
    // borderColor: "#515151",
    padding: 10,
    margin: 30,
    width: 100
  },
  buttonText: {
    color: "white",
    fontSize: 25
  }
});
export default JoinGameScreen;

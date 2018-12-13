import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Ionicons } from "@expo/vector-icons";
import * as api from '../api.js'

class CreateGameScreen extends React.Component {
  state = {
    gameName: "",
    trailId: "",
    noOfPlayers: 0,
    PlayerName: ""
  };
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: <Text style={styles.headerTitle}>Create Game</Text>,
      headerLeft: (
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate("SelectTrail")}
        >
          <Ionicons name="ios-arrow-back" size={32} color="white" />
        </TouchableOpacity>
      ),
      headerRight: null
    };
  };
  render() {
    // console.log(this.props);
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
        <Text style={styles.text}>Selected trail:</Text>
        <Text style={styles.text}>{navigation.getParam("trail_name", "Trail")}</Text>
        <TextInput
          style={styles.input}
          placeholder="Game Name"
          onChangeText={text => {
            this.setState({ gameName: text });
          }}
        />
        <TextInput
          style={styles.input}
          placeholder="Your name here"
          onClick={() => {
            this.scroll.props.scrollToPosition(5, 5);
          }}
          returnKeyType="send"
          onSubmitEditing={this.handleCreate}
          onChangeText={text => {
            this.setState({ PlayerName: text });
          }}
        />
        <Text style={styles.text}>Select number of players</Text>
        <View style={styles.numbers}>
          <TouchableOpacity
            style={
              this.state.noOfPlayers === 1
                ? styles.numberButtonSelected
                : styles.numberButton
            }
            onPress={() => {
              this.handlePress(1);
            }}
          >
            <Text
              style={
                this.state.noOfPlayers === 1
                  ? styles.numberTextSelected
                  : styles.numberText
              }
            >
              1
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              this.state.noOfPlayers === 2
                ? styles.numberButtonSelected
                : styles.numberButton
            }
            onPress={() => {
              this.handlePress(2);
            }}
          >
            <Text
              style={
                this.state.noOfPlayers === 2
                  ? styles.numberTextSelected
                  : styles.numberText
              }
            >
              2
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              this.state.noOfPlayers === 3
                ? styles.numberButtonSelected
                : styles.numberButton
            }
            onPress={() => {
              this.handlePress(3);
            }}
          >
            <Text
              style={
                this.state.noOfPlayers === 3
                  ? styles.numberTextSelected
                  : styles.numberText
              }
            >
              3
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              this.state.noOfPlayers === 4
                ? styles.numberButtonSelected
                : styles.numberButton
            }
            onPress={() => {
              this.handlePress(4);
            }}
          >
            <Text
              style={
                this.state.noOfPlayers === 4
                  ? styles.numberTextSelected
                  : styles.numberText
              }
            >
              4
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={this.handleCreate} style={styles.button}>
          <Text style={styles.buttonText}>Create</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    );
  }
  componentDidMount() {
    const trailId = this.props.navigation.getParam("trailId", 'your chosen trail');
    this.setState({
      trailId
    });
  }
  handlePress = num => {
    this.setState({
      noOfPlayers: num
    });
  }
  handleCreate = () => {
    const gameData = {
      gameName: this.state.gameName,
      noOfPlayers: this.state.noOfPlayers,
      trailId: this.state.trailId
    }
    api.createGame(gameData)
    .then(({gamePin}) => {
      return api.createPlayer(this.state.PlayerName, gamePin)
    })
    .then((res) => {
      this.props.navigation.navigate("Waiting")
    })
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 17
  },
  backButton: {
    paddingLeft: 15,
    paddingRight: 10
  },
  headerTitle: {
    color: "white",
    fontSize: 20
  },
  button: {
    alignItems: "center",
    backgroundColor: "#7B68BF",
    borderWidth: 0,
    borderRadius: 9,
    // borderColor: "#515151",
    padding: 10,
    margin: 30,
    width: 300
  },
  buttonText: {
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
  numberButton: {
    borderWidth: 0,
    borderColor: "#515151",
    borderRadius: 9,
    padding: 0,
    margin: 10,
    height: 40,
    width: 40,
    backgroundColor: "rgba(62, 172, 154, 0.2)",
    justifyContent: "center"
  },
  numberButtonSelected: {
    borderWidth: 0,
    borderColor: "#515151",
    borderRadius: 9,
    padding: 0,
    margin: 10,
    height: 40,
    width: 40,
    backgroundColor: "rgba(62, 172, 154, 1.0)",
    justifyContent: "center"
  },
  numbers: {
    display: "flex",
    flexDirection: "row",
    borderColor: "black",
    borderWidth: 0
  },
  numberText: {
    color: "#515151",
    fontSize: 23,
    borderColor: "black",
    textAlign: "center"
  },
  numberTextSelected: {
    color: "white",
    fontSize: 23,
    textAlign: "center"
  }
});
export default CreateGameScreen;

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  Platform
} from "react-native";
import { LinearGradient } from "expo";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Ionicons } from "@expo/vector-icons";
import * as api from "../api.js";

class CreateGameScreen extends React.Component {
  state = {
    gameName: "",
    trailId: "",
    noOfPlayers: 0,
    PlayerName: "",
    blank: null
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
      headerRight: <Text />
    };
  };
  render() {
    // console.log(this.props);
    // console.log(this.state);
    console.log(this.state.blank);
    const { navigation } = this.props;
    const { blank } = this.state;
    return (
      <KeyboardAwareScrollView
        contentContainerStyle={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center"
        }}
        // style={{height: '100%', borderColor: 'black', borderWidth: 0.5}}
        // enableOnAndroid
        // enableAutomaticScroll
        // keyboardOpeningTime={0}
        // extraHeight={Platform.select({ android: 200 })}
      >
        <View style={styles.heading}>
          <Text style={styles.text}>Selected trail:</Text>
          <Text style={styles.trailName}>
            {navigation.getParam("trail_name", "Trail")}
          </Text>
          <Text style={styles.blank}>{blank ? "All fields required" : ""}</Text>
        </View>
        {/* <LinearGradient
          style={styles.gradient}
          start={{ x: 0.0, y: 1.0 }}
          end={{ x: 1.0, y: 1.0 }}
          colors={["#2ebf91", "#8360c3"]}
        > */}
        <View style={styles.inputs}>
          <TextInput
            style={blank && blank.gameName ? styles.noInput : styles.input}
            placeholder="Game Name"
            onChangeText={text => {
              this.setState({ gameName: text });
            }}
          />
          {/* </LinearGradient> */}
          {/* <LinearGradient
          style={styles.gradient}
          start={{ x: 0.0, y: 1.0 }}
          end={{ x: 1.0, y: 1.0 }}
          colors={["#2ebf91", "#8360c3"]}
        > */}
          <TextInput
            style={blank && blank.PlayerName ? styles.noInput : styles.input}
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
        </View>
        {/* </LinearGradient> */}
        <View style={styles.players}>
          <Text style={styles.text}>Select number of players:</Text>

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
        </View>
        <View style={styles.buttonView}>
          <TouchableOpacity onPress={this.handleCreate} style={styles.button}>
            <Text style={styles.buttonText}>Create</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    );
  }
  componentDidMount() {
    const trailId = this.props.navigation.getParam(
      "trailId",
      "your chosen trail"
    );
    this.setState({
      trailId
    });
  }
  handlePress = num => {
    this.setState({
      noOfPlayers: num
    });
  };
  handleCreate = () => {
    const { gameName, PlayerName, noOfPlayers } = this.state;
    const blank = this.validate(gameName, PlayerName, noOfPlayers);
    if (blank.gameName || blank.PlayerName || blank.noOfplayers) {
      this.setState({ blank });
    } else {
      const gameData = {
        gameName: this.state.gameName,
        noOfPlayers: this.state.noOfPlayers,
        trailId: this.state.trailId
      };
      api
        .createGame(gameData)
        .then(({ gamePin }) => {
          console.log(gamePin);
          return Promise.all([
            api.createPlayer(this.state.PlayerName, gamePin),
            gamePin
          ]);
        })
        .then(([player, gamePin]) => {
          console.log(gamePin);
          // this.setState({ blank: null });
          this.props.navigation.navigate("Waiting", { GamePin: gamePin });
        });
    }
  };
  validate = (gameName, PlayerName, noOfPlayers) => {
    return {
      gameName: gameName.length === 0,
      PlayerName: PlayerName.length === 0,
      noOfplayers: noOfPlayers === 0
    };
  };
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontFamily: "sf-thin",
    color: "#515151"
  },
  whiteTxt: {
    fontSize: 20,
    fontFamily: "sf-thin",
    color: "white"
  },
  blank: {
    fontSize: 20,
    fontFamily: "sf-thin",
    color: "red"
  },
  trailName: {
    fontSize: 24,
    fontFamily: "sf-light",
    letterSpacing: 0.7,
    color: "#8360c3"
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
  heading: {
    borderColor: "black",
    borderWidth: 0,
    width: "100%",
    flex: 3,
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  inputs: {
    borderColor: "black",
    borderWidth: 0,
    width: "100%",
    flex: 7,
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  players: {
    borderColor: "black",
    borderWidth: 0,
    width: "100%",
    flex: 4,
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  buttonView: {
    borderColor: "black",
    borderWidth: 0,
    width: "100%",
    flex: 3,
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#8360c3",
    borderWidth: 0,
    borderRadius: 11,
    // borderColor: "#515151",
    padding: 10,
    width: "50%",
    height: "50%"
  },
  buttonText: {
    color: "white",
    fontSize: 22,
    fontFamily: "sf-thin",
    letterSpacing: 1
  },
  // gradient: {
  //   margin: 30,
  //   borderRadius: 12,
  //   width: '80%',
  //   height: '10%',
  //   alignItems: "center",
  //   justifyContent: 'center',
  // },
  noInput: {
    borderColor: "red",
    borderWidth: 0.8,
    borderRadius: 12,
    width: "80%",
    height: "23%",
    fontSize: 22,
    padding: 10,
    fontFamily: "sf-thin",
    letterSpacing: 0.5,
    color: "#515151"
  },
  input: {
    borderColor: "#515151",
    borderWidth: 0.8,
    // backgroundColor: 'white',
    borderRadius: 12,
    // height: '97%',
    // width: '98%',
    width: "80%",
    height: "23%",
    fontSize: 22,
    padding: 10,
    fontFamily: "sf-thin",
    letterSpacing: 0.5,
    color: "#515151"
  },
  numberButton: {
    borderWidth: 0,
    borderColor: "#515151",
    borderRadius: 9,
    padding: 0,
    // margin: 13,
    height: 43,
    width: 43,
    backgroundColor: "rgba(62, 172, 154, 0.2)",
    justifyContent: "center"
  },
  numberButtonSelected: {
    borderWidth: 0,
    borderColor: "#515151",
    borderRadius: 9,
    padding: 0,
    // margin: 13,
    height: 43,
    width: 43,
    backgroundColor: "rgba(62, 172, 154, 1.0)",
    justifyContent: "center"
  },
  numbers: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: "black",
    borderWidth: 0,
    width: "80%"
  },
  numberText: {
    color: "#515151",
    fontSize: 24,
    textAlign: "center",
    fontFamily: "sf-light"
  },
  numberTextSelected: {
    color: "white",
    fontSize: 24,
    textAlign: "center",
    fontFamily: "sf-regular"
  }
});
export default CreateGameScreen;

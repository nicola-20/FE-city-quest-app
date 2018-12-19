import React, { Component } from "react";
import ReactNative, {
  Animated,
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  TextInput,
  ScrollView,
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
        {/* <View style={styles.view}> */}
        <Text adjustsFontSizeToFit numberOfLines={2} style={styles.text}>
          To join a game, enter the invitation PIN and your name below:
        </Text>
        <TextInput
          // onFocus={this.handleOnFocus}
          style={styles.input}
          placeholder="Game PIN"
          onChangeText={text => {
            this.setState({ GamePin: text });
          }}
        />
        <TextInput
          // onFocus={this.handleOnFocus}
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
        {/* </View> */}
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

  // scrollToInput = reactNode => {
  //   this.scroll.scrollToFocusedInput(reactNode);
  // };

  // handleOnFocus = e => {
  //   if (Platform.OS === "android") {
  //     console.log(typeof e.target, 'inside input focus')
  //     this.scrollToInput(ReactNative.findNodeHandle(e.target));
  //   }
  // };
  handleJoin = () => {
    const { GamePin, PlayerName } = this.state;
    api
      .createPlayer(PlayerName, GamePin)
      .then(PlayerName => {
        this.props.navigation.navigate("Waiting", {
          GamePin: GamePin,
          PlayerName: PlayerName
        });
      })
      .catch(err => {
        console.log(err)
        this.props.navigation.navigate("ErrorScreen", {
          msg: "Cannot create player",
          err
        })
      }
      );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: "black",
    borderWidth: 0
  },
  // view: {
  //   flex: 1,
  //   minHeight: "90%",
  //   // justifyContent: "center",
  //   // alignContent: "space-between",
  //   borderColor: "black",
  //   // justifyContent: 'center',
  //   alignItems: 'center',
  //   justifyContent: 'space-evenly',
  //   borderWidth: 0.6
  // },
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
    // height: "10%",
    fontSize: 22,
    padding: 10,
    fontFamily: "sf-thin",
    letterSpacing: 0.5,
    color: "#515151",
    marginTop: 60
    // marginBottom: 30,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#8360c3",
    borderWidth: 0,
    borderRadius: 9,
    // borderColor: "#515151",
    padding: 10,
    width: "30%",
    // height: "10%",
    marginTop: 60
  },
  buttonText: {
    color: "white",
    fontSize: 22,
    fontFamily: "sf-thin",
    letterSpacing: 1
  }
});

//   render() {
//     // console.log(this.state);
//     const { navigation } = this.props;
//     return (
//       <KeyboardAwareScrollView
//         contentContainerStyle={{
//           height: '100%'
//           // flex: 1,
//           // justifyContent: "space-evenly",
//           // alignItems: "center",
//           // paddingBottom: 20
//         }}
//         enableOnAndroid={true}
//       >
//         <View
//           style={{
//             flex: 1,
//             justifyContent: "space-evenly",
//             alignItems: "center",
//             paddingBottom: 20
//           }}
//         >
// <Text adjustsFontSizeToFit numberOfLines={2} style={styles.text}>
//   To join a game, enter the invitation PIN and your name below:
// </Text>
//           <TextInput
//             style={styles.input}
//             placeholder="Game PIN"
//             onChangeText={text => {
//               this.setState({ GamePin: text });
//             }}
//           />
//           <TextInput
//             style={styles.input}
//             placeholder="Your name here"
//             onClick={() => {
//               this.scroll.props.scrollToPosition(5, 5);
//             }}
//             returnKeyType="join"
//             onSubmitEditing={this.handleJoin}
//             onChangeText={text => {
//               this.setState({ PlayerName: text });
//             }}
//           />
//           <TouchableOpacity onPress={this.handleJoin} style={styles.button}>
//             <Text style={styles.buttonText}>Join</Text>
//           </TouchableOpacity>
//         </View>
//       </KeyboardAwareScrollView>
//     );
//   }

//   handleJoin = () => {
//     const { GamePin, PlayerName } = this.state;
//     api.createPlayer(PlayerName, GamePin);
//     this.props.navigation.navigate("Waiting", { GamePin: GamePin });
//   };
// }

// const styles = StyleSheet.create({
//   view: {
//     flex: 1,
//     justifyContent: "center",
//     alignContent: "space-between"
//   },
//   text: {
//     width: "80%",
//     fontFamily: "sf-light",
//     fontSize: 20,
//     color: "#515151"
//   },
//   backButton: {
//     paddingLeft: 15,
//     paddingRight: 10
//   },
//   headerTitle: {
//     color: "white",
//     fontSize: 20,
//     fontFamily: "sf-light",
//     letterSpacing: 0.7,
//     width: "100%",
//     textAlign: "center"
//   },
//   input: {
//     borderColor: "#515151",
//     borderWidth: 0.7,
//     borderRadius: 12,
//     width: "80%",
//     height: "10%",
//     fontSize: 22,
//     padding: 10,
//     fontFamily: "sf-thin",
//     letterSpacing: 0.5,
//     color: "#515151"
//   },
//   button: {
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#8360c3",
//     borderWidth: 0,
//     borderRadius: 9,
//     // borderColor: "#515151",
//     padding: 10,
//     width: "30%",
//     height: "10%"
//   },
//   buttonText: {
//     color: "white",
//     fontSize: 22,
//     fontFamily: "sf-thin",
//     letterSpacing: 1
//   }
// });
export default JoinGameScreen;

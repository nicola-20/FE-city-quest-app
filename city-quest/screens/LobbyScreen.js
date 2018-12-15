import React from "react";
import { View, Text, Button, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo";

class LobbyScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: null,
      headerLeft: null,
      headerRight: null
    };
  };
  render() {
    const { navigation } = this.props;
    return (
      <LinearGradient style={styles.view} colors={["#2ebf91", "#8360c3"]}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("JoinGame");
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Join Game</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SelectTrail");
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Create Game</Text>
        </TouchableOpacity>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center"
  },
  button: {
    alignItems: "center",
    // backgroundColor: "#841584",
    borderWidth: 0.7,
    borderRadius: 9,
    borderColor: "white",
    padding: 10,
    margin: 30,
    width: '80%'
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontFamily: 'sf-thin',
    letterSpacing: 1
  }
});
export default LobbyScreen;

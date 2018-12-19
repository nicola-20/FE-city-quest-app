import React from "react";
import {
  View,
  Text,
  Image,
  Button,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Platform
} from "react-native";
import { LinearGradient } from "expo";
import FontAwesome, { Icons, IconTypes } from "react-native-fontawesome";

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
        <View style={styles.title}>
          {/* <Text
            adjustsFontSizeToFit
            numberOfLines={1}
            style={{
              color: "white",
              fontFamily: "sf-bold",
              fontSize: 50,
              letterSpacing: 4,
              width: "80%",
            }}
          >
            CITY{' '}
            <FontAwesome style={{fontSize: 60}}>
              {Icons.searchLocation}
            </FontAwesome>
            UEST
          </Text> */}
          <Image
                source={require('../assets/images/title.png')}
                style={{ width: 260 , height: 130 / (600 / 260) }}
              />
        </View>
        <View style={styles.buttons}>
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
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1
    // flexDirection: "column",
    // justifyContent: "space-evenly",
    // alignItems: "center"
  },
  title: {
    flex: 2,
    width: "100%",
    borderColor: 'red',
    borderWidth: 0,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  buttons: {
    flex: 2,
    width: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderColor: 'white',
    borderWidth: 0
  },
  button: {
    alignItems: "center",
    // backgroundColor: "#841584",
    borderWidth: 0.8,
    borderRadius: 9,
    borderColor: "white",
    padding: 10,
    width: 260
  },
  buttonText: {
    color: "white",
    fontSize: 22,
    fontFamily: "sf-light",
    letterSpacing: 1
  }
});
export default LobbyScreen;

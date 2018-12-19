import React from "react";
import {
  ScrollView,
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  FlatList
} from "react-native";
import { LinearGradient } from "expo";
import { Ionicons } from "@expo/vector-icons";
import * as api from "../api.js";
import convertTime from "../utils/index.js";

class ErrorScreen extends React.Component {
  state = {
    err: null
  };
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: <Text style={styles.headerTitle}>Something went wrong</Text>
    };
  };
  render() {
    return (
      // <LinearGradient style={styles.view} colors={["#2ebf91", "#8360c3"]}>
      <FlatList
        data={[...trails]}
        contentContainerStyle={{
          alignItems: "center"
        }}
        keyExtractor={(item, index) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Lobby");
            }}
            style={styles.button}
          >
            <Text
              adjustsFontSizeToFit
              numberOfLines={1}
              style={styles.buttonText}
            >
              Restart
            </Text>
          </TouchableOpacity>
        )}
      />
    );
  }
  componentDidMount() {}
}

const styles = StyleSheet.create({
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
  loadingView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  // gradient: {
  //   alignItems: "center",
  //   justifyContent: 'center',
  //   width: 300,
  //   height: 68,
  //   margin: 10,
  //   marginBottom: 0,
  //   marginTop: 20,
  //   borderRadius: 11
  // },
  button: {
    alignItems: "center",
    backgroundColor: "#8360c3",
    // backgroundColor: "#5990AA",
    // backgroundColor: 'white',
    borderWidth: 0,
    borderRadius: 9,
    borderColor: "white",
    padding: 8,
    margin: 10,
    marginBottom: 0,
    marginTop: 20,
    width: "88%",
    minWidth: "88%"
    // width: 297,
    // height: 65
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontFamily: "sf-light",
    letterSpacing: 1
    // color: '#8360c3',
  },
  smallButtonText: {
    color: "white",
    // color: '#8360c3',
    // color: '#2ebf91',
    fontSize: 15,
    fontFamily: "sf-thin",
    letterSpacing: 1
  }
});

export default ErrorScreen;

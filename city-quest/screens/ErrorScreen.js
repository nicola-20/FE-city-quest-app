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
import { AntDesign } from "@expo/vector-icons";
import * as api from "../api.js";
import convertTime from "../utils/index.js";

class ErrorScreen extends React.Component {
  state = {
    err: null
  };
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: <Text style={styles.headerTitle}>Oh no!</Text>,
      headerLeft: <Text />,
      headerRight: <Text />
    };
  };
  render() {
    const { err } = this.state;
    return (
      <View style={styles.container}>
        <Text style={{ ...styles.text, color: "#8360C3", fontSize: 22 }}>
          Something went wrong!
        </Text>
        <Text style={styles.text}>"{err}"</Text>
        <Text style={styles.icon}>
          <AntDesign name="meh" size={70} color="#43A79E" />
        </Text>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate("Lobby");
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
        <TouchableOpacity
          onPress={() => this.props.navigation.goBack()}
          style={styles.button}
        >
          <Text
            adjustsFontSizeToFit
            numberOfLines={1}
            style={styles.buttonText}
          >
            Go back
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
  componentDidMount() {
    const { msg } = this.props.navigation.state.params;
    this.setState({
      err: msg
    });
  }
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    fontFamily: "sf-light",
    textAlign: "center",
    fontSize: 20,
    paddingTop: 15,
    paddingBottom: 15,
    alignItems: "center"
  },
  icon: {
    alignItems: "center",
    paddingTop: 30,
    paddingBottom: 45,
    textAlign: "center"
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
  button: {
    alignItems: "center",
    backgroundColor: "#8360c3",
    borderWidth: 0,
    borderRadius: 9,
    borderColor: "white",
    padding: 8,
    margin: 20,
    width: "60%",
    minWidth: "60%"
  },
  buttonText: {
    color: "white",
    fontSize: 22,
    fontFamily: "sf-thin",
    letterSpacing: 1
  },
  smallButtonText: {
    color: "white",
    fontSize: 15,
    fontFamily: "sf-thin",
    letterSpacing: 1
  }
});

export default ErrorScreen;

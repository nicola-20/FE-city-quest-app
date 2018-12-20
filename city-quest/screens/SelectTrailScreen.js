import React from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  FlatList
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as api from "../api.js";
import convertTime from "../utils/index.js";

class SelectTrailScreen extends React.Component {
  state = {
    trails: [],
    isLoading: true
  };
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: <Text style={styles.headerTitle}>Select Trail</Text>,
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
    const { navigation } = this.props;
    const { trails } = this.state;
    if (this.state.isLoading)
      return (
        <ActivityIndicator
          size="large"
          color="#8360c3"
          style={{ margin: 30 }}
        />
      );
    return (
      <FlatList
        data={[...trails]}
        contentContainerStyle={{
          alignItems: "center"
        }}
        keyExtractor={(item, index) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("CreateGame", {
                trailId: item.id,
                trail_name: item.name
              });
            }}
            style={styles.button}
          >
            <Text
              adjustsFontSizeToFit
              numberOfLines={1}
              style={styles.buttonText}
            >
              {item.name}
            </Text>
            <Text
              adjustsFontSizeToFit
              numberOfLines={1}
              style={styles.smallButtonText}
            >
              Region: {item.region.city}, Time:{" "}
              {convertTime(item.duration) || "N/A"}
            </Text>
          </TouchableOpacity>
        )}
      />
    );
  }
  componentDidMount() {
    api
      .getTrails()
      .then(({ trails }) => this.setState({ trails, isLoading: false }))
      .catch(err =>
        this.props.navigation.navigate("ErrorScreen", {
          msg: "No trails available",
          err
        })
      );
  }
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
  button: {
    alignItems: "center",
    backgroundColor: "#8360c3",
    borderWidth: 0,
    borderRadius: 9,
    borderColor: "white",
    padding: 8,
    margin: 10,
    marginBottom: 0,
    marginTop: 20,
    width: "88%",
    minWidth: "88%"
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontFamily: "sf-light",
    letterSpacing: 1
  },
  smallButtonText: {
    color: "white",
    fontSize: 15,
    fontFamily: "sf-thin",
    letterSpacing: 1
  }
});

export default SelectTrailScreen;

import PropTypes from "prop-types";
import React, { Component } from "react";
import { NavigationActions } from "react-navigation";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo";

class SideMenu extends Component {
  navigateToScreen = route => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  };

  render() {
    return (
      <LinearGradient style={styles.container} colors={["#2ebf91", "#8360c3"]}>
        <TouchableOpacity
          style={styles.button}
          onPress={this.navigateToScreen("Game")}
        >
          <Text
            style={styles.buttonText}
            adjustsFontSizeToFit
            numberOfLines={2}
          >
            game
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={this.navigateToScreen("CompletedTasks")}
        >
          <Text
            style={styles.buttonText}
            adjustsFontSizeToFit
            numberOfLines={1}
          >
            completed tasks
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={this.navigateToScreen("Info")}
        >
          <Text
            style={styles.buttonText}
            adjustsFontSizeToFit
            numberOfLines={1}
          >
            info
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={this.navigateToScreen("Leaderboard")}
        >
          <Text
            style={styles.buttonText}
            adjustsFontSizeToFit
            numberOfLines={2}
          >
            leaderboard
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={this.navigateToScreen("Lobby")}
        >
          <Text
            style={styles.buttonText}
            adjustsFontSizeToFit
            numberOfLines={1}
          >
            quit
          </Text>
        </TouchableOpacity>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  button: {
    height: "10%",
    width: "80%",
    borderWidth: 0.7,
    borderColor: "white",
    borderRadius: 9,
    padding: 6,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonText: {
    color: "white",
    fontSize: 30,
    fontFamily: "sf-thin",
    letterSpacing: 0.7
  }
});

SideMenu.propTypes = {
  navigation: PropTypes.object
};

export default SideMenu;

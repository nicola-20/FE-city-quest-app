import React from "react";
import { Text, ScrollView, View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

class CompletedTasksScreen extends React.Component {
  state = {
    route: this.props.navigation.state.params.trail.route
  };
  render() {
    const currentPlayer = this.props.navigation.state.params.playerName;
    const players = this.props.navigation.state.params.game.playersArray;
    let currentProgress = 0;
    for (let i = 0; i < players.length; i++) {
      if (players[i].playerName === currentPlayer)
        currentProgress = players[i].progress;
    }
    return (
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          justifyContent: "space-evenly",
          alignItems: "flex-start"
        }}
        style={styles.view}
      >
        {this.state.route.map((location, index) => {
          return (
            <View key={index} style={styles.location}>
              {/* {index < currentProgress ? (
                <MaterialCommunityIcons
                  name="check-circle"
                  size={35}
                  color="black"
                  style={{borderColor: 'black', borderWidth: 0.5}}
                />
              ) : (
                <MaterialCommunityIcons
                  name="checkbox-blank-circle"
                  size={35}
                  color="black"
                  style={{borderColor: 'black', borderWidth: 0.5}}
                />
              )} */}
              {index < currentProgress ? (
                <MaterialCommunityIcons
                  name="check-circle-outline"
                  size={30}
                  color="#8360C3"
                />
              ) : (
                <MaterialCommunityIcons
                  name="checkbox-blank-circle-outline"
                  size={30}
                  color="#515151"
                />
              )}
              {/* <Text style={styles.locationName}>{index + 1}. </Text> */}
              <Text
                adjustsFontSizeToFit
                numberOfLines={1}
                style={styles.locationName}
              >
                {location.name}
              </Text>
            </View>
          );
        })}
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  view: {
    height: "100%",
    borderColor: "black",
    borderWidth: 0,
    padding: 10
  },
  location: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderColor: "black",
    borderWidth: 0,
    width: "100%"
  },
  locationName: {
    borderColor: "black",
    borderWidth: 0,
    fontSize: 25,
    width: "87%",
    justifyContent: "center",
    color: "#515151",
    fontFamily: "sf-thin",
    letterSpacing: 1,
    paddingLeft: 5
  }
});
export default CompletedTasksScreen;

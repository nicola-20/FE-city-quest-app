import React from "react";
import {
  Text,
  ScrollView,
  View,
  StyleSheet,
  RefreshControl
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as api from "../api";

class CompletedTasksScreen extends React.Component {
  state = {
    route: this.props.navigation.state.params.trail.route,
    progress: 0,
    refreshing: false
  };
  render() {
    const { progress } = this.state;
    return (
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          justifyContent: "space-evenly",
          alignItems: "flex-start"
        }}
        style={styles.view}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh}
          />
        }
      >
        {this.state.route.map((location, index) => {
          return (
            <View key={index} style={styles.location}>
              {index < progress ? (
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
              {index < progress ? (
                <Text
                  adjustsFontSizeToFit
                  numberOfLines={1}
                  style={styles.locationName}
                >
                  {location.name}
                </Text>
              ) : (
                <Text
                  adjustsFontSizeToFit
                  numberOfLines={1}
                  style={styles.locationName}
                />
              )}
            </View>
          );
        })}
      </ScrollView>
    );
  }
  componentDidMount() {
    const { gamePin } = this.props.navigation.state.params.game;
    const playerName = this.props.navigation.state.params.playerName;
    api.getGame(gamePin).then(game => {
      const currentPlayer = game.playersArray.filter(player => {
        return player.playerName === playerName;
      });
      const progress = currentPlayer[0].progress;
      this.setState({ progress });
    });
  }

  onRefresh = () => {
    const { gamePin } = this.props.navigation.state.params.game;
    const playerName = this.props.navigation.state.params.playerName;
    api.getGame(gamePin).then(game => {
      const currentPlayer = game.playersArray.filter(player => {
        return player.playerName === playerName;
      });
      const progress = currentPlayer[0].progress;
      this.setState({ progress, refreshing: false });
    });
  };
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

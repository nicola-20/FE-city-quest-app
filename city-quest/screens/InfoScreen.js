import React from "react";
import { Text, View, ActivityIndicator } from "react-native";

class InfoScreen extends React.Component {
  state = {
    isloading: true,
    currentLocation: '',
    info: {}
  }
  render() {
    if (this.state.isLoading)
    return (
      <ActivityIndicator
        size="large"
        color="#8360c3"
        style={{ margin: 30 }}
      />
    );
    return (
      <View>
        <Text>Info </Text>
        <Text>{this.state.currentLocation}</Text>
      </View>
    );
  }
  componentDidMount() {
    // AIzaSyBG0SybP0EKWH3Jvwki7IR5AMyO_cUeeQc
    const currentPlayer = this.props.navigation.state.params.playerName;
    const players = this.props.navigation.state.params.game.playersArray;
    let currentProgress = 0;
    for (let i = 0; i < players.length; i++) {
      if (players[i].playerName === currentPlayer)
        currentProgress = players[i].progress;
    }
    const route = this.props.navigation.state.params.trail.route;
    const city = this.props.navigation.state.params.trail.region.city
    const currentLocation = route[currentProgress].name;
    // `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${currentLocation},${city}&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=AIzaSyBG0SybP0EKWH3Jvwki7IR5AMyO_cUeeQc`
    this.setState({
      currentLocation,
      isLoading: false
    })
  }
}
export default InfoScreen;

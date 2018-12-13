import React from "react";
import { View, Text, Button, StyleSheet, Animated, ActivityIndicator } from "react-native";
import * as api from '../api.js'
import { AntDesign } from "@expo/vector-icons";

// const AnimatedIcon = Animated.createAnimatedComponent()

class WaitingScreen extends React.Component {
  state = {
    noOfPlayers: 0,
    players: [],
    gamePin: '',
    gameName: ''
  }
  static navigationOptions = ({navigation}) => {
    return {
      headerTitle: (<Text style={styles.headerTitle}>Waiting for players</Text>),
      headerLeft: null,
      headerRight: null
    }
  }
  render() {
    const { navigation } = this.props
    // console.log(this.state)
    const currentPlayers = []
    for (let i = 0; i <= this.state.noOfPlayers; i++) {
      if (this.state.players[i] && this.state.players[i].length > 1) {
        currentPlayers.push(this.state.players[i].playerName) //<Text>{this.state.players[i].playerName}</Text>
      } else {
        currentPlayers.push('waiting') //<ActivityIndicator size="large" color="#7B68BF" />
      }
    }
    console.log(currentPlayers, 'currentplayers')
    return (
      <View>
        <Text>Welcome to:</Text>
        <Text>{this.state.gameName}</Text>
        {/* <AntDesign name="loading2" size={32} color="white" /> */}
        {currentPlayers.map((player) => {
          return player === 'waiting' ? <ActivityIndicator size="large" color="#7B68BF" /> : <Text>{this.state.players[i].playerName}</Text>
        })}
        {/* <ActivityIndicator size="large" color="#7B68BF" /> */}
        <Button
          onPress={() => {navigation.navigate('Game')}}
          title="Start Game"
          color="#841584"
          />
        <Text>PIN: {this.state.gamePin}</Text>
      </View>
    );
  }
  componentDidMount() {
    const game = api.getGame()
    // .then((game) => {
      this.setState({
        noOfPlayers: game.noOfPlayers,
        players: game.playersArray,
        gamePin: game.gamePin,
        gameName: game.gameName
      })
    // })
  }
}
const styles = StyleSheet.create({
  text: {
    fontSize: 17
  },
  backButton: {
    marginLeft: 10,
    paddingRight: 10
  },
  headerTitle: {
    color: "white",
    fontSize: 20
  },
  button: {
    alignItems: "center",
    backgroundColor: "#7B68BF",
    borderWidth: 0,
    borderRadius: 9,
    // borderColor: "#515151",
    padding: 10,
    margin: 30,
    width: 300
  },
  buttonText: {
    color: "white",
    fontSize: 20
  }
});
export default WaitingScreen;
import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import * as api from '../api.js'

class WaitingScreen extends React.Component {
  state = {
    noOfPlayers: 0,
    players: []
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
    console.log(this.state)
    return (
      <View>
        <Text>Waiting for Players</Text>
        <Button
          onPress={() => {navigation.navigate('Game')}}
          title="Start Game"
          color="#841584"
        />
      </View>
    );
  }
  componentDidMount() {
    const game = api.getGame()
    // .then((game) => {
      this.setState({
        noOfPlayers: game.noOfPlayers,
        players: game.playersArray,
        gamePin: game.gamePin
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
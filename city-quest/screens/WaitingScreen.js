import React from "react";
import { View, Text, Button, StyleSheet, Animated, ActivityIndicator } from "react-native";
import * as api from '../api.js'
import { AntDesign } from "@expo/vector-icons";

// const AnimatedIcon = Animated.createAnimatedComponent()

class WaitingScreen extends React.Component {
  //
  state = {
    noOfPlayers: 4,
    playersArray: [],
    gamePin: '1234',
    gameName: 'Bobs Game'
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
    const { playersArray } = this.state;
    const currentPlayers = [];
    for (let i = 0; i < this.state.noOfPlayers; i++) {
     if(playersArray[i]) currentPlayers.push(playersArray[i].playerName)
     else currentPlayers.push(null)
    }

    

    console.log(this.state)
    return (

      <View>
        <Text>Welcome to:</Text>
        <Text>{this.state.gameName}</Text>
        <View>
          {
         currentPlayers.map((player, index) => {
          return player? <Text key={index}>{player}</Text> :  <ActivityIndicator key={index} size="large" color="#7B68BF" /> 
         })
       }
       </View>
        <Button
          onPress={() => {navigation.navigate('Game')}}
          title="Start Game"
          color="#841584"
          />
        <Text>PIN: {this.state.gamePin}</Text>
      </View>
    );
  }

  createGrid = () => {
    
  }
  componentDidMount() {
    const game = api.getGame()
    //.then((game) => {
      this.setState({
        noOfPlayers: game.noOfPlayers,
        playersArray: game.playersArray,
        gamePin: game.gamePin,
        gameName: game.gameName
     // })
    })
  }
}
const styles = StyleSheet.create({
  text: {
    fontSize: 17
  },
  backButton: {
    paddingLeft: 15,
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
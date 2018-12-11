import React from "react";
import { View, Text, Button, TouchableOpacity, StyleSheet } from "react-native";

class LobbyScreen extends React.Component {
  render() {
    const { navigation } = this.props
    return (
      <View>
        <Text>Lobby Component</Text>
        <TouchableOpacity onPress={() => {navigation.navigate('JoinGame')}} style={styles.button}>
          <Text>
            Join Game
          </Text>
        </TouchableOpacity>
        {/* <Button
          onPress={() => {navigation.navigate('JoinGame')}}
          title="Join Game"
          color="#841584"
          accessibilityLabel="Join an existing game"
        /> */}
        {/* <Button
          onPress={() => {navigation.navigate('SelectTrail')}}
          title="Create Game"
          color="#841584"
          accessibilityLabel="Create a new game"
        /> */}
         <TouchableOpacity onPress={() => {navigation.navigate('SelectTrail')}} style={styles.button}>
          <Text>
            Create Game
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: "#841584",
    borderWidth: 0.5,
    color: 'white',
    padding: 10
  }
})
export default LobbyScreen;

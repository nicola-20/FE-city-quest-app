import React from "react";
import { View, Text, Button } from "react-native";

class WaitingScreen extends React.Component {
  render() {
    const { navigation } = this.props
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
}
export default WaitingScreen;
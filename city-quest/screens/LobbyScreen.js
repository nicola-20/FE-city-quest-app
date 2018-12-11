import React from "react";
import { View, Text, Button } from "react-native";

class LobbyScreen extends React.Component {
  render() {
    const { navigation } = this.props
    return (
      <View>
        <Text>Lobby Component</Text>
        <Button
          onPress={() => {navigation.navigate('Home')}}
          title="Join Game"
          color="#841584"
          accessibilityLabel="Join an existing game"
        />
        <Button
          onPress={() => {navigation.navigate('SelectTrail')}}
          title="Create Game"
          color="#841584"
          accessibilityLabel="Create a new game"
        />
      </View>
    );
  }
}
export default LobbyScreen;

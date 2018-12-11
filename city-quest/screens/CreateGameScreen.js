import React from "react";
import { View, Text, Button } from "react-native";

class CreateGameScreen extends React.Component {
  render() {
    const { navigation } = this.props
    return (
      <View>
        <Text>Create Game</Text>
        <Button
          onPress={() => {navigation.navigate('Waiting')}}
          title="Create"
          color="#841584"
        />
      </View>
    );
  }
}
export default CreateGameScreen;
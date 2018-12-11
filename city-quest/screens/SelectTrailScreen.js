import React from "react";
import { View, Text, Button } from "react-native";

class SelectTrailScreen extends React.Component {
  render() {
    const { navigation } = this.props
    return (
      <View>
        <Text>Select Trail</Text>
        <Button
          onPress={() => {navigation.navigate('CreateGame')}}
          title="Select Trail 1"
          color="#841584"
        />
        <Button
          onPress={() => {navigation.navigate('CreateGame')}}
          title="Select Trail 2"
          color="#841584"
        />
      </View>
    );
  }
}
export default SelectTrailScreen;
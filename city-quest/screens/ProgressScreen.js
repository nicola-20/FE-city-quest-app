import React from 'react';
import { Text } from 'react-native'

class ProgressScreen extends React.Component {
  render() {
    console.log(this.props.navigation.state, 'inside question screen')
    return (
      <Text>Question Component</Text>
    )
  }
}
export default ProgressScreen
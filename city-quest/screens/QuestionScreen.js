import React from 'react';
import { Text } from 'react-native'

class QuestionScreen extends React.Component {
  render() {
    console.log(this.props.navigation.state, 'inside question screen')
    return (
      <Text>Question Component player: {this.props.navigation.state.params.playerName}</Text>
    )
  }
}
export default QuestionScreen
import React from 'react';
import { Text } from 'react-native'

class LeaderboardScreen extends React.Component {
  render() {
    console.log(this.props.navigation.state, 'inside question screen')
    return (
      <Text>Leaderboard Component</Text>
    )
  }
}
export default LeaderboardScreen
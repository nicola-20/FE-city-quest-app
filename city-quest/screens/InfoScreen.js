import React from 'react';
import { Text, View } from 'react-native'

class InfoScreen extends React.Component {
  render() {
    console.log(this.props.navigation.state,  'inside info screen')
    return (
      <Text>Info Component</Text>
    )
  }
}
export default InfoScreen
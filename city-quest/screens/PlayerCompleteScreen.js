import React from "react";
import {
  Text,
  ActivityIndicator,
  View,
  ScrollView,
  StyleSheet
} from "react-native";
import * as api from "../api";

export default class PlayerCompleteScreen extends React.Component {
 state = {
     playerName: '',
     gameName: '',
     trailName: '',
     totalTime: '',
     isLoading: true
 }


 render() {
     console.log(this.props.navigation.state.params)
     return (

        <View></View>

     )
 }
}
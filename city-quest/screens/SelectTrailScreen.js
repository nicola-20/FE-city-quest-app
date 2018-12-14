import React from "react";
import { ScrollView, Text, Button, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as api from '../api.js'

class SelectTrailScreen extends React.Component {
  state = {
    trails: [],
    isLoading: true
  }
  static navigationOptions = ({navigation}) => {
    return {
      headerTitle: (<Text style={styles.headerTitle}>Select Trail</Text>),
      headerLeft: (
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate("Lobby")}
        >
          <Ionicons name="ios-arrow-back" size={32} color="white" />
        </TouchableOpacity>
      ),
      headerRight: null
    }
  }
  render() {
    const { navigation } = this.props
    const { trails } = this.state
    if(this.state.isLoading) return (<ActivityIndicator></ActivityIndicator>)
    return (
      <ScrollView contentContainerStyle={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      
      }}>
      {trails.map((trail) => {
        return  (<TouchableOpacity key={trail.id} onPress={() => {navigation.navigate('CreateGame', {trailId: trail.id, trail_name: trail.name})}} style={styles.button}><Text style={styles.buttonText}>{trail.name}</Text></TouchableOpacity>)
      })}
      </ScrollView>
    );
  }
  componentDidMount() {
    api.getTrails()
    .then(({trails}) => this.setState({trails, isLoading: false}))
  }
}

const styles = StyleSheet.create({
  backButton: {
    paddingLeft: 15,
    paddingRight: 10
  },
  headerTitle: {
    color: "white",
    fontSize: 20
  },
  button: {
    alignItems: "center",
    backgroundColor: "#7B68BF",
    borderWidth: 0,
    borderRadius: 9,
    // borderColor: "#515151",
    padding: 10,
    margin: 30,
    width: 300
  },
  buttonText: {
    color: "white",
    fontSize: 20
  }
})

export default SelectTrailScreen;
import React, { Component } from "react";
import { View, Text } from "react-native";
import { MapView } from "expo";

const Marker = MapView.Marker;

export default class Map extends React.Component {
  //   renderMarkers() {
  //     return this.props.places.map((place, i) => (
  //       <Marker key={i} title={place.name} coordinate={place.coords} />
  //     ))
  //   }
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: <Text style={styles.headerTitle}>Game Icon</Text>,
      headerLeft: null,
      headerRight: null
    };
  };

  render() {
    const { region } = this.props;
    return (
      <MapView
        style={styles.container}
        region={region}
        showsUserLocation
        showsMyLocationButton
      >
        {
          //this.renderMarkers()
        }
      </MapView>
    );
  }
}
const styles = {
  container: {
    width: "100%",
    height: "80%"
  }
};

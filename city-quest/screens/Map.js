import React, { Component } from "react";
import { View, Text } from "react-native";
import { MapView } from "expo";

const Marker = MapView.Marker;

export default class Map extends React.Component {
  state = {
    region: {}
  }
  //   renderMarkers() {
  //     return this.props.places.map((place, i) => (
  //       <Marker key={i} title={place.name} coordinate={place.coords} />
  //     ))
  //   }

  render() {
    const { region } = this.props;
    console.log(region, 'region')
    return (
      <MapView
        style={styles.container}
        region={this.state.region}
        onRegionChange={this.onRegionChange}
        showsUserLocation
        showsMyLocationButton
      >
        {
          //this.renderMarkers()
        }
      </MapView>
    );
  }

 

  onRegionChange(region) {
    this.setState({ region });
  }
}
const styles = {
  container: {
    width: "100%",
    height: "100"
  }
};

import React from "react";
import { Text, SafeAreaView } from "react-native";
import { Location, Permissions, MapView } from "expo";

const Marker = MapView.Marker;

const deltas = {
  latitudeDelta: 0.012,
  longitudeDelta: 0.013
};
const trailRegion = {
  // put in initial city location
  latitude: 53.48095,
  longitude: -2.23743
};

export default class MapScreen extends React.Component {
  state = {
    region: {}
  };

  render() {
    console.log(this.state.region);
    return (
      <MapView
        style={styles.container}
        region={this.state.region}
        showsUserLocation
        showsMyLocationButton
      >
        {
          //this.renderMarkers()
        }
      </MapView>
    );
  }

  componentWillMount() {
    this.setState({
      region: {
        ...trailRegion,
        ...deltas
      }
    });
    this.getLocationAsync();
  }

  onRegionChange = region => {
    this.setState({ region });
  };

  getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    const region = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      ...deltas
    };
    await this.setState({ region });
  };
}

const styles = {
  container: {
    width: "100%",
    height: "100%"
  }
};

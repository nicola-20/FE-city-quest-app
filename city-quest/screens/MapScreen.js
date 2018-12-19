import React from "react";
import { Text, SafeAreaView, Alert } from "react-native";
import { Location, Permissions, MapView } from "expo";
import * as api from "../api";

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
    region: {},
    locations: [],
    progress: 0
  };

  render() {
    return (
      <MapView
        style={styles.container}
        region={this.state.region}
        showsUserLocation
        showsMyLocationButton
      >
        {this.renderMarkers()}
      </MapView>
    );
  }

  renderMarkers() {
    const { locations, progress } = this.state;
    //console.log("this is our locations,", locations, progress);
    return (
      <Marker
        coordinate={{
          latitude: locations[progress].lat,
          longitude: locations[progress].long
        }}
        image={require('../assets/images/marker.png')}
      />
    );
  }

  componentDidUpdate() {
    if (this.props.navigation.state.params.progress) {
      if (this.props.navigation.state.params.progress !== this.state.progress) {
        Alert.alert(
          "Correct! New Challenge...",
          `Go to ${
            this.state.locations[this.props.navigation.state.params.progress]
              .name
          } and view the challenge when you arrive`, //location name off state and progress
          [
            {
              text: "OK",
              onPress: () => console.log("ok pressed")
            }
          ],
          { cancelable: false }
        );
        this.setState({
          progress: this.props.navigation.state.params.progress
        });
      }
    } else {
      Alert.alert(
        "Here's your first challenge!",
        `Go to ${
          this.state.locations[0].name
        } and view the challenge when you arrive`, //location name off state and progress
        [
          {
            text: "OK",
            onPress: () => console.log("ok pressed")
          }
        ],
        { cancelable: false }
      );
    }
  }

  componentWillMount() {
    this.setState({
      region: {
        ...trailRegion,
        ...deltas
      },
      locations: this.props.navigation.state.params.trail.route,
      progress: 0
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

import React from "react";
import { Text, SafeAreaView } from "react-native";
import Map from "./Map";
import { Location, Permissions } from "expo";

const deltas = {
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421
};
const region = {
  // put in initial city location
  latitude: 53.48095,
  longitude: -2.23743,
  latitudeDelta: 0.0025,
  longitudeDelta: 0.0921
};

export default class MapScreen extends React.Component {
  state = {
    region: null,
    coffeeShops: []
  };

  componentWillMount() {
    this.getLocationAsync();
  }

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

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Map
          region={region}
        //places={this.state.coffeeShops}
        />
      </SafeAreaView>
    );
  }
}

const styles = {
  container: {
    width: "100%",
    height: "150%"
  }
};

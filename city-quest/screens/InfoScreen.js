import React from "react";
import { Text, View, ActivityIndicator, Image, StyleSheet } from "react-native";

class InfoScreen extends React.Component {
  state = {
    isloading: true,
    currentLocation: "",
    info: {}
  };
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: <Text style={styles.headerTitle}>Information</Text>,
      headerLeft: <Text />,
      headerRight: <Text />
    };
  };
  render() {
    if (this.state.isLoading)
      return (
        <ActivityIndicator
          size="large"
          color="#8360c3"
          style={{ margin: 30 }}
        />
      );
    return (
      <View style={styles.view}>
        <Text style={styles.name}>{this.state.info.name} </Text>
        <Image
          style={{ height: 200, width: 300 }}
          source={{
            uri:
              "https://cofemanchester.contentfiles.net/media/thumbs/57/44/5744b9cd987987878a2a4f3280025dcf.jpg"
          }}
        />
        <Text style={styles.address}>{this.state.info.address}</Text>
        <Text style={styles.description}>{this.state.info.description}</Text>
      </View>
    );
  }
  componentDidMount() {
    // const currentPlayer = this.props.navigation.state.params.playerName;
    // const players = this.props.navigation.state.params.game.playersArray;
    // let currentProgress = 0;
    // for (let i = 0; i < players.length; i++) {
    //   if (players[i].playerName === currentPlayer)
    //     currentProgress = players[i].progress;
    // }
    // const route = this.props.navigation.state.params.trail.route;
    // const city = this.props.navigation.state.params.trail.region.city;
    // const currentLocation = route[currentProgress].name;
    // // `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${currentLocation},${city}&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=AIzaSyBG0SybP0EKWH3Jvwki7IR5AMyO_cUeeQc`
    this.setState({
      info: {
        name: "Manchester Cathedral",
        description:
          "Manchester Cathedral, formally the Cathedral and Collegiate Church of St Mary, St Denys and St George, in Manchester, England, is the mother church of the Anglican Diocese of Manchester, seat of the Bishop of Manchester and the city's parish church. It is on Victoria Street in Manchester city centre.",
        address: "Victoria St, Manchester M3 1SX",
        image:
          "https://cofemanchester.contentfiles.net/media/thumbs/57/44/5744b9cd987987878a2a4f3280025dcf.jpg"
      },
      isLoading: false
    });
  }
}

const styles = StyleSheet.create({
  view: {
    borderColor: "black",
    borderWidth: 0,
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 10
  },
  name: {
    fontSize: 30,
    fontFamily: "sf-light",
    letterSpacing: 0.7,
    color: "#8360C3",
    justifyContent: "center",
    textAlign: 'center',
    borderWidth: 0,
    borderColor: "blue"
  },
  address: {
    fontSize: 20,
    fontFamily: "sf-ultralight",
    letterSpacing: 0.7,
    color: "#515151",
    justifyContent: "center",
    textAlign: 'center',
    borderWidth: 0,
    borderColor: "blue"
  },
  description: {
    fontSize: 15,
    fontFamily: "sf-light",
    color: "#515151",
    justifyContent: "center",
    borderWidth: 0,
    borderColor: "blue",
    textAlign: 'justify',
  },
  headerTitle: {
    color: "white",
    fontSize: 20,
    fontFamily: "sf-light",
    letterSpacing: 0.7,
    width: "100%",
    textAlign: "center"
  }
});

export default InfoScreen;

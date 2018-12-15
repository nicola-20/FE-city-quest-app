import React from "react";
import { Asset, AppLoading, SplashScreen, Font } from "expo";
import { createAppContainer } from "react-navigation";
import Stack from "./navigation/Navigators";

const AppContainer = createAppContainer(Stack);

export default class App extends React.Component {
  state = {
    appIsReady: false
  };

  render() {
    if (this.state.appIsReady) {
      return <AppContainer />;
    } else {
      return <AppLoading />;
    }
  }
  componentDidMount() {
    SplashScreen.preventAutoHide();
    this.loadResourcesAsync()
      .then(() => this.setState({ appIsReady: true }))
      .catch(error =>
        console.error(`Unexpected error thrown when loading:
    ${error.stack}`)
      );
  }

  async loadResourcesAsync() {
    return Promise.all([
      Font.loadAsync({
        "sf-heavy": require("./assets/fonts/SF-Pro-Display-Heavy.otf")
      }),
      Font.loadAsync({
        "sf-bold": require("./assets/fonts/SF-Pro-Display-Bold.otf")
      }),
      Font.loadAsync({
        "sf-medium": require("./assets/fonts/SF-Pro-Display-Medium.otf")
      }),
      Font.loadAsync({
        "sf-regular": require("./assets/fonts/SF-Pro-Display-Regular.otf")
      }),
      Font.loadAsync({
        "sf-light": require("./assets/fonts/SF-Pro-Display-Light.otf")
      }),
      Font.loadAsync({
        "sf-thin": require("./assets/fonts/SF-Pro-Display-Thin.otf")
      }),
      Font.loadAsync({
        "sf-thin-italic": require("./assets/fonts/SF-Pro-Display-ThinItalic.otf")
      }),
      Font.loadAsync({
        "sf-ultralight": require("./assets/fonts/SF-Pro-Display-Ultralight.otf")
      }),
      Font.loadAsync({
        "sf-ultralight-italic": require("./assets/fonts/SF-Pro-Display-UltralightItalic.otf")
      }),
      Font.loadAsync({
        "fa-solid": require("./assets/fonts/fa-solid-900.ttf"),
        "FontAwesome5FreeSolid": require("./assets/fonts/FontAwesome5FreeSolid.ttf")
      })
    ]);
  }
}

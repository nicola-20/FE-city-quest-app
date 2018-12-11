
import React from 'react';
import { Image, Text, View } from 'react-native';
import { Asset, AppLoading, SplashScreen } from 'expo';

export default class App extends React.Component {
  state = {
    isSplashReady: false,
    inGame: false
  };

  render() {
    if (!this.state.isSplashReady) {
      return (
        <AppLoading
          startAsync={this._cacheSplashResourcesAsync}
          onFinish={() => this.setState({ isSplashReady: true })}
          onError={console.warn}
          autoHideSplash={false}
        />
      );
    }
    if (this.state.inGame) {
      return (
        <Text>Playing the game</Text>
      )
    } else return (
      <LobbyScreen />
    );    
  }

  _cacheSplashResourcesAsync = async () => {
    const png = require('./assets/images/splash.png');
    return Asset.fromModule(png).downloadAsync()
  }

  _cacheResourcesAsync = async () => {
    SplashScreen.hide();
    const images = [
      require('./assets/images/icon2.png'),
    ];

    const cacheImages = images.map((image) => {
      return Asset.fromModule(image).downloadAsync();
    });

    await Promise.all(cacheImages);
    this.setState({ isAppReady: true });
  }
}
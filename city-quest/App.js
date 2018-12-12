import React from "react";
import {
  createAppContainer,
} from "react-navigation";
import Stack from "./navigation/Navigators";

const AppContainer = createAppContainer(Stack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}


import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, Image, View, Text, TouchableOpacity } from "react-native";
import { DocumentPicker, ImagePicker, Permissions } from "expo";
import { storage } from "../firebase";
// import { SERVER_URI, PostFunStuff } from "../../constant";

export default class PhotoPicker extends React.Component {
  state = {
    image: null
  };

  render() {
    console.log(this.props.navigation.state.params, 'params inside photopicker')
    let { image } = this.state;

    return (
      <View  style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <TouchableOpacity onPress={this.pickImage} style={{height: 50, width: '80%', borderWidth: 0.5, borderColor: 'black', padding: 10, margin: 20}}>
        <Text>Pick an image from camera roll</Text>
        </TouchableOpacity>
        {image && (
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        )}
        <TouchableOpacity onPress={this.takeImage} style={{height: 50, width: '80%', borderWidth: 0.5, borderColor: 'black', padding: 10, margin: 20}}>
        <Text>Take a new image</Text>
        </TouchableOpacity>
      </View>
    );
  }

  takeImage = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    if (status !== "granted") {
      throw new Error("Denied CAMERA permissions!");
    }
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: "Images"
    });
    console.log(result);
    if (!result.cancelled) {
      this.setState({
        image: result.uri,
      });
    }
  };

  pickImage = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        throw new Error("Denied CAMERA_ROLL permissions!");
      }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "Images"
    });
    console.log(result);
    if (!result.cancelled) {
      this.setState({
        image: result.uri,
      });
    }
  };

// upload image to firebase
// use url to call the api function
// analyse image
// /api/games/gamePin/playerName patch url in body


  postPicture = () => {
    const imageName = 'player10'
    const uri = this.state.image;
    const { image } = this.state;
    const uploadTask = storage.ref(`images/${imageName}`).put(image);
    uploadTask.on(
      "state_changed",
      snapshot => {
        // progress function
      },
      error => {
        console.log(error); //complete function
      },
      () => {
        //complete function
        storage
          .ref("images")
          .child(imageName)
          .getDownloadURL()
          .then(url => {
            console.log(url, 'URL')
            this.props.setURL(url);
          });
      }
    );
  }
}

import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, Image, View, Text, TouchableOpacity } from "react-native";
import { DocumentPicker, ImagePicker, Permissions } from "expo";
// import { SERVER_URI, PostFunStuff } from "../../constant";
import * as api from '../api'

export default class PhotoPicker extends React.Component {
  state = {
    image: null
  };

  render() {
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
      base64: true,
      mediaTypes: "Images"
    });
    console.log(result.uri,  'URI');
    if (!result.cancelled) {
      this.setState({
        image: result.uri,
        base64: result.base64
      });
    }
  };

  pickImage = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        throw new Error("Denied CAMERA_ROLL permissions!");
      }
    const result = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      mediaTypes: "Images"
    });
    // console.log(result);
    if (!result.cancelled) {
      this.setState({
        image: result.uri,
        base64: result.base64
      })
      // .then(() => {
        api.analyseImage(result.base64, '8694', 'Nicki')
      // })
      .then((data) => {
        console.log(data)
      })
      
      // analyseImage = async (image, gamePin, playerName)
     
    }
  };
//   postPicture() {
//     const apiUrl = `${SERVER_URI}/upload`;
//     const uri = this.state.image;
//     const uriParts = uri.split(".");
//     const fileType = uriParts[uriParts.length - 1];
//     const formData = new FormData();
//     formData.append("photo", {
//       uri,
//       name: `photo.${fileType}`,
//       type: `image/${fileType}`
//     });
//     const options = {
//       method: "POST",
//       body: formData,
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "multipart/form-data"
//       }
//     };
//     return fetch(apiUrl, options);
//   }
}
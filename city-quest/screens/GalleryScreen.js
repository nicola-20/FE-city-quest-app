import React from "react";
import {
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ScrollView
} from "react-native";
import { FileSystem, MediaLibrary, Permissions } from "expo";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import Photo from "./Photo";

const PHOTOS_DIR = FileSystem.documentDirectory + "photos";

export default class GalleryScreen extends React.Component {
  state = {
    images: {},
    photos: [],
    selected: []
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.navbar}>
          <TouchableOpacity style={styles.button} onPress={this.props.onPress}>
            <Ionicons name="ios-arrow-back" size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.saveToGallery}>
            <Text style={styles.whiteText}>Save selected to gallery</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.sendPhoto}>
            <Text style={styles.whiteText}>Send selected as answer</Text>
          </TouchableOpacity>
        </View>
        <ScrollView contentComponentStyle={{ flex: 1 }}>
          <View style={styles.pictures}>
            {this.state.photos.map(this.renderPhoto)}
          </View>
        </ScrollView>
      </View>
    );
  }

  componentDidMount = async () => {
    const photos = await FileSystem.readDirectoryAsync(PHOTOS_DIR);
    this.setState({ photos });
  };

  toggleSelection = (uri, isSelected) => {
    let selected = this.state.selected;
    if (isSelected) {
      selected.push(uri);
    } else {
      selected = selected.filter(item => item !== uri);
    }
    this.setState({ selected });
  };

  saveToGallery = async () => {
    const photos = this.state.selected;
    if (photos.length > 0) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        throw new Error("Denied CAMERA_ROLL permissions!");
      }
      const promises = photos.map(photoUri => {
        return MediaLibrary.createAssetAsync(photoUri);
      });
      await Promise.all(promises);
      alert("Successfully saved photos to user's gallery!");
    } else {
      alert("No photos to save!");
    }
  };

  sendPhoto = async () => {
    const photos = this.state.selected;
    if (photos.length > 0) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        throw new Error("Denied CAMERA_ROLL permissions!");
      }
      //   const promises = photos.map(photoUri => {
      //     return MediaLibrary.createAssetAsync(photoUri);
      //   });
      //   await Promise.all(promises);
      //   alert("Successfully saved photos to user's gallery!");
      // } else {
      //   alert("No photos to save!");
    }
  };

  renderPhoto = fileName => (
    <Photo
      key={fileName}
      uri={`${PHOTOS_DIR}/${fileName}`}
      onSelectionToggle={this.toggleSelection}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  navbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#515151"
  },
  pictures: {
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 8
  },
  button: {
    paddingLeft: 20,
    paddingRight: 20
  },
  whiteText: {
    color: "white"
  }
});

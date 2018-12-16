import { Constants, Camera, FileSystem, Permissions } from "expo";
import React from "react";
import {
  Alert,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Slider,
  Platform
} from "react-native";
import {
  Ionicons,
  MaterialIcons,
  Foundation,
  MaterialCommunityIcons,
  Octicons
} from "@expo/vector-icons";
import GalleryScreen from "./GalleryScreen";

class CameraScreen extends React.Component {
  state = {
    autoFocus: "on",
    type: "back",
    ratio: "16:9",
    ratios: [],
    newPhotos: false,
    permissionsGranted: false,
    pictureSize: undefined,
    pictureSizes: [],
    pictureSizeId: 0,
    showGallery: false,
    showMoreOptions: false
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ permissionsGranted: status === "granted" });
  }

  componentDidMount() {
    FileSystem.makeDirectoryAsync(
      FileSystem.documentDirectory + "photos"
    ).catch(e => {
      console.log(e, "Directory exists");
    });
  }

  getRatios = async () => {
    const ratios = await this.camera.getSupportedRatios();
    return ratios;
  };

  toggleView = () =>
    this.setState({ showGallery: !this.state.showGallery, newPhotos: false });

  toggleFacing = () =>
    this.setState({ type: this.state.type === "back" ? "front" : "back" });

  setRatio = ratio => this.setState({ ratio });

  toggleFocus = () =>
    this.setState({ autoFocus: this.state.autoFocus === "on" ? "off" : "on" });

  takePicture = () => {
    if (this.camera) {
      this.camera.takePictureAsync({ onPictureSaved: this.onPictureSaved })
      .then(() => {
        alert('To view pictures, head to the gallery ->')
      })
    }
  };

  handleMountError = ({ message }) => console.error(message);

  onPictureSaved = async photo => {
    await FileSystem.moveAsync({
      from: photo.uri,
      to: `${FileSystem.documentDirectory}photos/${Date.now()}.jpg`
    });
    console.log("SAVED <-");
    this.setState({ newPhotos: true });
  };

  collectPictureSizes = async () => {
    if (this.camera) {
      const pictureSizes = await this.camera.getAvailablePictureSizesAsync(
        this.state.ratio
      );
      let pictureSizeId = 0;
      if (Platform.OS === "ios") {
        pictureSizeId = pictureSizes.indexOf("High");
      } else {
        pictureSizeId = pictureSizes.length - 1;
      }
      this.setState({
        pictureSizes,
        pictureSizeId,
        pictureSize: pictureSizes[pictureSizeId]
      });
    }
  };
  renderGallery() {
    return <GalleryScreen onPress={this.toggleView.bind(this)} />;
  }
  renderNoPermissions = () => (
    <View style={styles.noPermissions}>
      <Text style={{ color: "white" }}>
        Camera permissions not granted - cannot open camera preview.
      </Text>
    </View>
  );
  renderTopBar = () => (
    <View style={styles.topBar}>
    </View>
  );

  renderBottomBar = () => (
    <View style={styles.bottomBar}>
      <TouchableOpacity style={styles.toggleButton} onPress={this.toggleFacing}>
        <Ionicons name="ios-reverse-camera" size={35} color="white" />
      </TouchableOpacity>
        <TouchableOpacity
          onPress={this.takePicture}
          style={{ alignSelf: "center" }}
        >
          <Ionicons name="ios-radio-button-on" size={70} color="white" />
        </TouchableOpacity>
      <TouchableOpacity style={styles.bottomButton} onPress={this.toggleView}>
          <Foundation name="thumbnails" size={35} color="white" />
          {this.state.newPhotos && <View style={styles.newPhotosDot} />}
      </TouchableOpacity>
    </View>
  );

  renderCamera = () => (
    <View style={{ flex: 1 }}>
      <Camera
        ref={ref => {
          this.camera = ref;
        }}
        style={styles.camera}
        onCameraReady={this.collectPictureSizes}
        type={this.state.type}
        ratio={this.state.ratio}
        pictureSize={this.state.pictureSize}
        onMountError={this.handleMountError}
      >
        {this.renderTopBar()}
        {this.renderBottomBar()}
      </Camera>
    </View>
  );

  render() {
    const cameraScreenContent = this.state.permissionsGranted
      ? this.renderCamera()
      : this.renderNoPermissions();
    const content = this.state.showGallery
      ? this.renderGallery()
      : cameraScreenContent;
    return <View style={styles.container}>{content}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000"
  },
  camera: {
    flex: 1,
    justifyContent: "space-between"
  },
  topBar: {
    flex: 0.2,
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: Constants.statusBarHeight / 2
  },
  bottomBar: {
    paddingBottom: 5,
    backgroundColor: "transparent",
    alignSelf: "flex-end",
    justifyContent: "space-between",
    flex: 0.2,
    flexDirection: "row",
    width: '100%'
  },
  noPermissions: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10
  },
  gallery: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap"
  },
  toggleButton: {
    flex: 0.3,
    alignItems: "center",
    justifyContent: "center",
    height: '100%'
  },
  bottomButton: {
    flex: 0.3,
    height: '100%',
    justifyContent: "center",
    alignItems: "center"
  },
  newPhotosDot: {
    position: "absolute",
    top: 26,
    right: 25,
    width: 9,
    height: 9,
    borderRadius: 4,
    backgroundColor: "#2EBF91"
  },
  options: {
    position: "absolute",
    bottom: 80,
    left: 30,
    width: 200,
    height: 160,
    backgroundColor: "#000000BA",
    borderRadius: 4,
    padding: 10
  },
  // detectors: {
  //   flex: 0.5,
  //   justifyContent: "space-around",
  //   alignItems: "center",
  //   flexDirection: "row"
  // },
  // pictureQualityLabel: {
  //   fontSize: 10,
  //   marginVertical: 3,
  //   color: "white"
  // },
  // pictureSizeContainer: {
  //   flex: 0.5,
  //   alignItems: "center",
  //   paddingTop: 10
  // },
  // pictureSizeChooser: {
  //   alignItems: "center",
  //   justifyContent: "space-between",
  //   flexDirection: "row"
  // },
  // pictureSizeLabel: {
  //   flex: 1,
  //   alignItems: "center",
  //   justifyContent: "center"
  // },
  // facesContainer: {
  //   position: "absolute",
  //   bottom: 0,
  //   right: 0,
  //   left: 0,
  //   top: 0
  // },
  // face: {
  //   padding: 10,
  //   borderWidth: 2,
  //   borderRadius: 2,
  //   position: 'absolute',
  //   borderColor: '#FFD700',
  //   justifyContent: 'center',
  //   backgroundColor: 'rgba(0, 0, 0, 0.5)',
  // },
  // landmark: {
  //   width: landmarkSize,
  //   height: landmarkSize,
  //   position: 'absolute',
  //   backgroundColor: 'red',
  // },
  // faceText: {
  //   color: '#FFD700',
  //   fontWeight: 'bold',
  //   textAlign: 'center',
  //   margin: 10,
  //   backgroundColor: 'transparent',
  // },
  row: {
    flexDirection: "row"
  }
});

export default CameraScreen;

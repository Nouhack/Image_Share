import React, { useState, useRef, useEffect } from "react";
import {
  Text,
  Button,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Image,
} from "react-native";
import { Camera } from "expo-camera";
import firebase from "../firebaseConf";
import Icon from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { Colors } from "../Colors";
import { useIsFocused } from "@react-navigation/native";
import Slider from "../components/Slider";
//import , { decode as atob } from 'base-64';
// You can import from local files

// or any pure javascript modules available in npm
const { width: winWidth, height: winHeight } = Dimensions.get("window");

const CustomCamera = ({ navigation }) => {
  const isFocused = useIsFocused();

  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.front);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.on);
  const [cameraIsReady, setCameraIsReady] = useState(false);
  const [image, setimage] = useState(null);
  const [zoomprop, setzoom] = useState(0);

  const [imageIsUploaded, setImageIsUploaded] = useState(false);
  const [baseimage, setBaseImage] = useState(null);

  const valval = useSelector((state) => state.cameraOn);

  useEffect(() => {
    if (isFocused) {
      setimage(null);
    }
  }, [isFocused]);

  const verifyPermission = () => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  };

  useEffect(() => {
    verifyPermission();
  }, []);

  if (hasPermission === null) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" color={Colors.PRIMARY_COLOR} />
      </View>
    );
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const SwitchCamera = () => {
    setType((prev) =>
      prev === Camera.Constants.Type.front
        ? Camera.Constants.Type.back
        : Camera.Constants.Type.front
    );
  };

  const Flashfucn = () => {
    setFlash((prev) =>
      prev === Camera.Constants.FlashMode.off
        ? Camera.Constants.FlashMode.on
        : Camera.Constants.FlashMode.off
    );
  };

  const TakeImage = async () => {
    if (cameraIsReady) {
      /*
      this.camera
        .takePictureAsync({ quality: 0.5, base64: true })
        .then(({ uri, base64 }) => {
          // let newbase=base64.replaceAll(" ","+")
          console.log(isBase64(base64));
          setimage(uri);
          console.log(uri); 
          console.log(base64);
          //settest(newbase)
        });
    */
      const props = await this.camera.takePictureAsync({
        base64: true,
        quality: 0.7,
      });

      console.log(props);
      setBaseImage("data:image/jpg;base64," + props.base64);

      setimage(props.uri);
    }
  };

  async function uploadImageAsync(uri) {
    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    const ref = firebase.storage().ref().child(uri.split("/").pop());
    console.log("loading");
    setImageIsUploaded(true);
    const snapshot = await ref.put(blob);
    setImageIsUploaded(false);
    console.log("uploaded !!!!");

    // We're done with the blob, close and release it
    blob.close();

    return await snapshot.ref.getDownloadURL();
  }

  const uploadImageToStoreAndDataBase = () => {
    uploadImageAsync(image).then((URL) => {
      let imageName = image.split("/").pop().replace(/-/gi, "_");

      firebase
        .database()
        .ref("images/" + imageName.slice(0, imageName.length - 4))
        .set({
          imageURL: URL,
        });
      navigation.navigate("ImageShare");
    });

    /*
    let storageRef = firebase.storage().ref();
    let fileRef = storageRef.child('nouh.jpg');
    fileRef
      .putString(baseimage, 'data_uri')
      .then((res) => {
        console.log('image has been uploaded sucessfully');
      })
      .catch((err) => {
        console.log(err);
      });
      */
  };

  return (
    <View style={styles.container}>
      {isFocused ? (
        <>
          {!image ? (
            <>
              <Camera
                onCameraReady={() => {
                  setCameraIsReady(true);
                }}
                ratio="16:9"
                zoom={zoomprop}
                style={styles.CameraView}
                type={type}
                flashMode={flash}
                ref={(ref) => {
                  this.camera = ref;
                }}
              ></Camera>
              <View style={styles.sliderContainer}>
                <Slider changeVal={setzoom} />
              </View>
              <View
                style={{
                  width: "100%",
                  // backgroundColor: 'blue',
                  alignItems: "center",
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}
              >
                <Icon
                  name={
                    flash === Camera.Constants.FlashMode.off
                      ? "ios-flash-off"
                      : "ios-flash"
                  }
                  color="white"
                  size={30}
                  onPress={Flashfucn}
                />
                <Icon
                  name="ios-disc-outline"
                  color="white"
                  size={70}
                  onPress={TakeImage}
                />
                <Icon
                  name="ios-camera-reverse-sharp"
                  color="white"
                  size={30}
                  onPress={SwitchCamera}
                />
              </View>
            </>
          ) : (
            <>
              <Image
                style={
                  type === Camera.Constants.Type.back
                    ? styles.ImageTaken
                    : {
                        ...styles.ImageTaken,
                        transform: [{ rotateY: "180deg" }],
                      }
                }
                source={{ uri: image }}
              />
              {imageIsUploaded ? (
                <ActivityIndicator size="large" color="#0000ff" />
              ) : null}

              <View
                style={{
                  width: "100%",
                  // backgroundColor: 'blue',
                  alignItems: "center",
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}
              >
                <Icon
                  name={"ios-save"}
                  color="white"
                  size={30}
                  onPress={uploadImageToStoreAndDataBase}
                />

                <Icon
                  name="ios-remove-circle"
                  color="white"
                  size={30}
                  onPress={() => setimage(null)}
                />
              </View>
            </>
          )}
        </>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "#ecf0f1",
    alignItems: "center",
    padding: 8,
  },
  CameraView: {
    height: winHeight,
    width: winWidth,
    position: "absolute",
  },
  ImageTaken: {
    height: winHeight,
    width: winWidth,
    position: "absolute",
  },
  sliderContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "flex-end",
  },
});

export default CustomCamera;

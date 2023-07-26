import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import {
  CameraSvgWhite,
  CameraSvgGray,
} from "../../assets/images/svg/CameraSvg";
import MapSvg from "../../assets/images/svg/MapSvg";
import TrashSvg from "../../assets/images/svg/TrashSvg";

const initialFormState = {
  title: "",
  place: "",
};

export default function CreatePostsScreen({ navigation }) {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [formState, setFormState] = useState(initialFormState);
  const [isFocused, setIsFocused] = useState({
    title: false,
    place: false,
  });
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");
    })();
  }, []);
  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const keyboardClose = () => {
    setIsKeyboardOpen(false);
    Keyboard.dismiss();
  };

  const handleInputFocus = (textinput) => {
    setIsKeyboardOpen(true);
    setIsFocused({
      [textinput]: true,
    });
  };
  const handleInputBlur = (textinput) => {
    setIsFocused({
      [textinput]: false,
    });
  };

  const takePhoto = async () => {
    if (cameraRef) {
      const photo = await cameraRef.takePictureAsync();
      await MediaLibrary.createAssetAsync(photo.uri);
      setPhoto(photo.uri);
      const location = await Location.getCurrentPositionAsync();
    }
    console.log("Camera error");
  };

  const sendPhoto = () => {
    navigation.navigate("DefaultScreen", { photo, formState });
    setFormState(initialFormState);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardClose}>
      <View style={styles.container}>
        <View>
          <Camera style={styles.camera} ref={setCameraRef}>
            {photo && (
              <View style={styles.photoView}>
                <Image
                  source={{ uri: photo }}
                  style={{ width: 358, height: 240, borderRadius: 8 }}
                />
              </View>
            )}

            <TouchableOpacity style={styles.button} onPress={takePhoto}>
              <View
                style={
                  photo
                    ? {
                        ...styles.takePhotoBtn,
                        backgroundColor: "rgba(255, 255, 255, 0.3)",
                      }
                    : {
                        ...styles.takePhotoBtn,
                      }
                }
              >
                {photo ? <CameraSvgWhite /> : <CameraSvgGray />}
              </View>
            </TouchableOpacity>
          </Camera>
          <Text
            style={{
              fontSize: 16,
              color: "#bdbdbd",
              fontFamily: "Roboto-Regular",
              marginTop: 8,
            }}
          >
            {photo ? "Редагувати фото" : "Завантажте фото"}
          </Text>
        </View>
        <View>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View>
              <TextInput
                style={
                  isFocused.title
                    ? { ...styles.onFocusInput }
                    : { ...styles.input }
                }
                placeholder={"Назва..."}
                placeholderTextColor={"#bdbdbd"}
                onFocus={() => handleInputFocus("title")}
                onBlur={() => handleInputBlur("title")}
                value={formState.title}
                onChangeText={(value) =>
                  setFormState((prevState) => ({
                    ...prevState,
                    title: value,
                  }))
                }
              />
              <View style={{ position: "relative" }}>
                <TextInput
                  style={
                    isFocused.place
                      ? {
                          ...styles.onFocusInput,
                          marginTop: 16,
                          paddingLeft: 28,
                        }
                      : {
                          ...styles.input,
                          marginTop: 16,
                          paddingLeft: 28,
                        }
                  }
                  placeholder={"Місцевість..."}
                  placeholderTextColor={"#bdbdbd"}
                  onFocus={() => handleInputFocus("place")}
                  onBlur={() => handleInputBlur("place")}
                  value={formState.place}
                  onChangeText={(value) =>
                    setFormState((prevState) => ({
                      ...prevState,
                      place: value,
                    }))
                  }
                />
                <View style={{ position: "absolute", top: 35, left: 0 }}>
                  <MapSvg />
                </View>
              </View>
            </View>
            {!isKeyboardOpen && (
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={
                    photo
                      ? { ...styles.sendBtn, backgroundColor: "#ff6c00" }
                      : { ...styles.sendBtn, backgroundColor: "#f6f6f6" }
                  }
                  onPress={sendPhoto}
                >
                  <Text
                    style={
                      photo
                        ? { ...styles.sendBtnTitle, color: "#fff" }
                        : { ...styles.sendBtnTitle, color: "#bdbdbd" }
                    }
                  >
                    Опублікувати
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.3}
                  style={{
                    backgroundColor: "#f6f6f6",
                    width: 70,
                    height: 40,
                    borderRadius: 20,
                    marginTop: 74,
                    justifyContent: "center",
                    alignItems: "center",
                    alignSelf: "center",
                  }}
                  // onPress={deletePost}
                >
                  <TrashSvg />
                </TouchableOpacity>
              </View>
            )}
          </KeyboardAvoidingView>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    gap: 32,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
  camera: {
    height: 240,
    marginTop: 32,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e8e8e8",
    backgroundColor: "#f6f6f6",
  },
  photoView: {
    position: "absolute",
    left: 0,
    top: 0,
    borderRadius: 8,
  },
  button: { alignSelf: "center" },

  takePhotoBtn: {
    backgroundColor: "#fff",
    height: 60,
    width: 60,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "#e8e8e8",
    backgroundColor: "#fff",
    color: "#212121",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    padding: 15,
    paddingLeft: 0,
  },
  onFocusInput: {
    borderBottomWidth: 1,
    color: "#212121",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    padding: 15,
    paddingLeft: 0,
    borderColor: "#ff6c00",
    backgroundColor: "#ffffff",
  },
  sendBtn: {
    height: 50,
    borderRadius: 100,
    marginTop: 43,
    alignItems: "center",
    justifyContent: "center",
  },
  sendBtnTitle: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
  },
});

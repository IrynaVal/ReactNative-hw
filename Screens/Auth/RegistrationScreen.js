import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Image,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";

import AddSvg from "../../assets/images/svg/AddSvg";
import CrossSvg from "../../assets/images/svg/CrossSvg";
import { userSignUp } from "../../redux/auth/authOperations";
import { db, storage } from "../../firebase/config";

const initialFormState = {
  login: "",
  email: "",
  password: "",
};

export default function RegistrationScreen() {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [formState, setFormState] = useState(initialFormState);
  const [isFocused, setIsFocused] = useState({
    login: false,
    email: false,
    password: false,
  });
  const [isVisible, setIsVisible] = useState(false);
  const [photo, setPhoto] = useState(null);

  const navigation = useNavigation();
  const dispatch = useDispatch();

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

  const signUp = () => {
    console.log(formState);
    dispatch(userSignUp(formState));
    setFormState(initialFormState);
    navigation.navigate("Home");
  };

  const showPassword = () => {
    setIsVisible((prevState) => !prevState);
  };

  let photoPath = "../../assets/images/photo.jpg";

  const addPhoto = async () => {
    setPhoto(photoPath);

    // const response = await fetch(photo);
    // const file = await response.blob();

    // const photoId = Date.now().toString();
    // const storageRef = await ref(storage, `userPhoto/${photoId}`);
    // await uploadBytesResumable(storageRef, file);

    // const getPhotoUrl = await getDownloadURL(storageRef);
    // console.log("getPhotoUrl", getPhotoUrl);

    // return getPhotoUrl;
  };

  const deletePhoto = () => {
    setPhoto(null);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardClose}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.image}
          source={require("../../assets/images/bg-img.jpg")}
        >
          <View style={styles.formContainer}>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
              <View
                style={{
                  ...styles.form,
                  marginBottom: isKeyboardOpen ? 32 : 45,
                }}
              >
                <View style={styles.photoBox}>
                  {photo ? (
                    <>
                      <Image
                        // source={{
                        //   uri: "https://reactjs.org/logo-og.png",
                        // }}
                        source={require("../../assets/images/photo.jpg")}
                        style={styles.photo}
                      />

                      <TouchableOpacity
                        activeOpacity={0.3}
                        style={styles.deleteBtnBox}
                        onPress={deletePhoto}
                      >
                        <CrossSvg />
                      </TouchableOpacity>
                    </>
                  ) : (
                    <>
                      <Image
                        source={{
                          uri: "https://",
                        }}
                        style={styles.photo}
                      />

                      <TouchableOpacity
                        activeOpacity={0.3}
                        style={styles.addBtnBox}
                        onPress={addPhoto}
                      >
                        <AddSvg />
                      </TouchableOpacity>
                    </>
                  )}
                </View>
                <View style={styles.header}>
                  <Text style={styles.headerTitle}>Реєстрація</Text>
                </View>
                <View>
                  <TextInput
                    style={isFocused.login ? styles.onFocusInput : styles.input}
                    placeholder={"Логін"}
                    placeholderTextColor={"#bdbdbd"}
                    onFocus={() => handleInputFocus("login")}
                    onBlur={() => handleInputBlur("login")}
                    value={formState.login}
                    onChangeText={(value) =>
                      setFormState((prevState) => ({
                        ...prevState,
                        login: value,
                      }))
                    }
                  />
                  <TextInput
                    style={
                      isFocused.email
                        ? { ...styles.onFocusInput, marginTop: 16 }
                        : { ...styles.input, marginTop: 16 }
                    }
                    placeholder={"Адреса електронної пошти"}
                    placeholderTextColor={"#bdbdbd"}
                    onFocus={() => handleInputFocus("email")}
                    onBlur={() => handleInputBlur("email")}
                    value={formState.email}
                    onChangeText={(value) =>
                      setFormState((prevState) => ({
                        ...prevState,
                        email: value,
                      }))
                    }
                  />
                  <View style={{ position: "relative" }}>
                    <TextInput
                      style={
                        isFocused.password
                          ? { ...styles.onFocusInput, marginTop: 16 }
                          : { ...styles.input, marginTop: 16 }
                      }
                      placeholder={"Пароль"}
                      placeholderTextColor={"#bdbdbd"}
                      secureTextEntry={!isVisible ? true : false}
                      onFocus={() => handleInputFocus("password")}
                      onBlur={() => handleInputBlur("password")}
                      value={formState.password}
                      onChangeText={(value) =>
                        setFormState((prevState) => ({
                          ...prevState,
                          password: value,
                        }))
                      }
                    />
                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={{
                        ...styles.link,
                        position: "absolute",
                        top: 10,
                        right: 16,
                      }}
                      onPress={showPassword}
                    >
                      <Text style={styles.linkTitle}>
                        {!isVisible ? "Показати" : "Сховати"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                {!isKeyboardOpen && (
                  <>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={styles.btn}
                      onPress={signUp}
                    >
                      <Text style={styles.btnTitle}>Зареєструватися</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.link}>
                      <Text style={styles.linkTitle}>
                        Вже є акаунт?{" "}
                        <Text
                          style={{
                            textDecorationLine: "underline",
                          }}
                          onPress={() => navigation.navigate("Login")}
                        >
                          Увійти
                        </Text>
                      </Text>
                    </TouchableOpacity>
                  </>
                )}
              </View>
            </KeyboardAvoidingView>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },

  formContainer: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#fff",
  },
  form: {
    marginHorizontal: 16,
    marginBottom: 32,
  },
  photoBox: {
    width: 120,
    height: 120,
    backgroundColor: "#f6f6f6",
    borderRadius: 16,
    marginTop: -60,
    marginHorizontal: 126,
    position: "relative",
  },
  photo: {
    width: 120,
    height: 120,
    borderRadius: 16,
  },
  deleteBtnBox: {
    position: "absolute",
    bottom: 9,
    left: 102,
  },
  addBtnBox: {
    position: "absolute",
    bottom: 14,
    left: 107,
  },
  addBtn: {
    width: 25,
    height: 25,
  },
  header: {
    alignItems: "center",
    marginBottom: 32,
    marginTop: 32,
  },
  headerTitle: {
    fontSize: 30,
    color: "#212121",
    fontFamily: "Roboto-Medium",
  },
  input: {
    borderWidth: 1,
    borderColor: "#e8e8e8",
    height: 50,
    borderRadius: 8,
    backgroundColor: "#f6f6f6",
    color: "#212121",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    padding: 16,
  },
  onFocusInput: {
    borderWidth: 1,
    height: 50,
    borderRadius: 8,
    color: "#212121",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    padding: 16,
    borderColor: "#ff6c00",
    backgroundColor: "#ffffff",
  },
  btn: {
    backgroundColor: "#ff6c00",
    height: 50,
    borderRadius: 100,
    marginTop: 43,
    alignItems: "center",
    justifyContent: "center",
  },
  btnTitle: {
    color: "#ffffff",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
  },
  link: {
    marginTop: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  linkTitle: {
    color: "#1b4371",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
  },
});

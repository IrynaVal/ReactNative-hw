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
} from "react-native";
import AddSvg from "../assets/images/AddSvg";
import CrossSvg from "../assets/images/CrossSvg";

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

  const signIn = () => {
    console.log(formState);
    setFormState(initialFormState);
  };

  const showPassword = () => {
    setIsVisible((prevState) => !prevState);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardClose}>
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View
            style={{
              ...styles.form,
              marginBottom: isKeyboardOpen ? 32 : 45,
            }}
          >
            <View style={styles.imageBox}>
              <Image
                // source={{
                //   uri: "https://reactjs.org/logo-og.png",
                // }}
                source={require("../assets/images/photo.jpg")}
                style={styles.image}
              />
              <View style={styles.addBtnBox}>
                {/* <AddSvg /> */}
                <CrossSvg />
              </View>
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
                  setFormState((prevState) => ({ ...prevState, login: value }))
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
                  setFormState((prevState) => ({ ...prevState, email: value }))
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
                  onPress={signIn}
                >
                  <Text style={styles.btnTitle}>Зареєструватися</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} style={styles.link}>
                  <Text style={styles.linkTitle}>Вже є акаунт? Увійти</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#fff",
  },
  form: {
    marginHorizontal: 16,
    marginBottom: 32,
  },
  imageBox: {
    width: 120,
    height: 120,
    backgroundColor: "#f6f6f6",
    borderRadius: 16,
    marginTop: -60,
    marginHorizontal: 126,
    position: "relative",
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 16,
  },
  addBtnBox: {
    position: "absolute",
    // bottom: 14,
    // left: 107,
    bottom: 9,
    left: 102,
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
    backgroundColor: "transparent",
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

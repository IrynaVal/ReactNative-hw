import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const initialFormState = {
  email: "",
  password: "",
};

export default function LoginScreen() {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [formState, setFormState] = useState(initialFormState);
  const [isFocused, setIsFocused] = useState({
    email: false,
    password: false,
  });
  const [isVisible, setIsVisible] = useState(false);

  const navigation = useNavigation();

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

  const logIn = () => {
    console.log(formState);
    setFormState(initialFormState);
    navigation.navigate("Home");
  };

  const showPassword = () => {
    setIsVisible((prevState) => !prevState);
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
                  marginBottom: isKeyboardOpen ? 32 : 111,
                }}
              >
                <View style={styles.header}>
                  <Text style={styles.headerTitle}>Увійти</Text>
                </View>
                <View>
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
                      onPress={logIn}
                    >
                      <Text style={styles.btnTitle}>Увійти</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.link}>
                      <Text style={styles.linkTitle}>
                        Немає акаунту?{" "}
                        <Text
                          style={{
                            textDecorationLine: "underline",
                          }}
                          onPress={() => navigation.navigate("Registration")}
                        >
                          Зареєструватися
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

import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";

export default function PostsScreen() {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  const keyboardClose = () => {
    setIsKeyboardOpen(false);
    Keyboard.dismiss();
    console.log(formState);
    setFormState(initialFormState);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardClose}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Публікації</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    alignItems: "center",
    marginBottom: 32,
    marginTop: 55,
    paddingBottom: 11,
    borderBottomWidth: 2,
    borderBottomColor: "#e8e8e8",
  },
  headerTitle: {
    fontSize: 17,
    color: "#212121",
    fontFamily: "Roboto-Medium",
  },
});
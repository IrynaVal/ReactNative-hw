import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>
    </View>
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
  },
  headerTitle: {
    fontSize: 17,
    color: "#212121",
    fontFamily: "Roboto-Medium",
  },
});

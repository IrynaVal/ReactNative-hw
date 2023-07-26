import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Image,
  View,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";

import MessageSvg from "../../assets/images/svg/MessageSvg";
import MapSvg from "../../assets/images/svg/MapSvg";

export default function DefaultPostsScreen({ route, navigation }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (route.params) {
      console.log(route.params);
      setPosts((prevState) => [route.params, ...prevState]);
    }
  }, [route.params]);

  return (
    <View style={styles.container}>
      <View style={styles.userContainer}>
        <View style={styles.photoBox}>
          <Image
            // source={{
            //   uri: "https://reactjs.org/logo-og.png",
            // }}
            source={require("../../assets/images/photo.jpg")}
            style={styles.photo}
          />
        </View>
        <View>
          <Text style={styles.userName}>Natali Romanova</Text>
          <Text style={styles.userEmail}>email@example.com</Text>
        </View>
      </View>
      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.postContainer}>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Image
                source={{ uri: item.photo }}
                style={{ height: 240, width: 358, borderRadius: 8 }}
              />
            </View>
            <Text
              style={{
                fontFamily: "Roboto-Medium",
                fontSize: 16,
                color: "#212121",
              }}
            >
              {route.params.formState.title}
            </Text>
            <View style={{ flexDirection: "row", gap: 49 }}>
              <TouchableOpacity
                activeOpacity={0.3}
                onPress={() => navigation.navigate("Comments")}
                style={{ flexDirection: "row", gap: 6 }}
              >
                <MessageSvg />
                <Text
                  style={{
                    fontFamily: "Roboto-Regular",
                    fontSize: 16,
                    color: "#bdbdbd",
                  }}
                >
                  0
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.3}
                onPress={() => navigation.navigate("Map")}
                style={{ flexDirection: "row", gap: 6 }}
              >
                <MapSvg />
                <Text
                  style={{
                    fontFamily: "Roboto-Regular",
                    fontSize: 16,
                    color: "#212121",
                    textDecorationLine: "underline",
                  }}
                >
                  {route.params.formState.place}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
  userContainer: {
    flexDirection: "row",
    marginTop: 32,
    alignItems: "center",
    gap: 8,
  },
  photoBox: {
    width: 60,
    height: 60,
    backgroundColor: "#f6f6f6",
    borderRadius: 16,
  },
  photo: {
    width: 60,
    height: 60,
    borderRadius: 16,
  },
  userName: {
    fontSize: 13,
    fontFamily: "Roboto-Bold",
  },
  userEmail: {
    fontSize: 11,
    fontFamily: "Roboto-Regular",
  },
  postContainer: {
    marginTop: 32,
    flexDirection: "column",
    gap: 8,
  },
});

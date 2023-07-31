import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { collection, onSnapshot } from "firebase/firestore";
import {
  StyleSheet,
  Image,
  View,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";

import { MessageSvg } from "../../assets/images/svg/MessageSvg";
import MapSvg from "../../assets/images/svg/MapSvg";
import { db } from "../../firebase/config";

export default function DefaultPostsScreen({ route, navigation }) {
  const [posts, setPosts] = useState([]);

  const { login, email } = useSelector((state) => state.auth);
  console.log("posts login", login);
  console.log("posts email", email);

  const getAllPosts = async () => {
    await onSnapshot(collection(db, "posts"), (snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.userContainer}>
        <View style={styles.photoBox}>
          <Image
            source={require("../../assets/images/photo.jpg")}
            style={styles.photo}
          />
        </View>
        <View>
          <Text style={styles.userName}>{login}</Text>
          <Text style={styles.userEmail}>{email}</Text>
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
              {item.formState.title}
              {/* {route.params.title} */}
            </Text>
            <View style={{ flexDirection: "row", gap: 49 }}>
              <TouchableOpacity
                activeOpacity={0.3}
                onPress={() =>
                  navigation.navigate("Comments", {
                    postId: item.id,
                    photoUrl: item.photo,
                  })
                }
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
                  {item.commentCounter}0
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.3}
                onPress={() =>
                  navigation.navigate("Map", { location: item.location })
                }
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
                  {item.formState.place}
                  {/* {route.params.place} */}
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

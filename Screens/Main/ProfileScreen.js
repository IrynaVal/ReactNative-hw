import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import {
  collection,
  query,
  where,
  onSnapshot,
  getDocs,
} from "firebase/firestore";

import { db } from "../../firebase/config";
import {
  MessageSvg,
  MessageSvgActive,
} from "../../assets/images/svg/MessageSvg";
import MapSvg from "../../assets/images/svg/MapSvg";
import LikeSvg from "../../assets/images/svg/LikeSvg";
import AddSvg from "../../assets/images/svg/AddSvg";
import CrossSvg from "../../assets/images/svg/CrossSvg";
import LogoutSvg from "../../assets/images/svg/LogoutSvg";
import { userLogOut } from "../../redux/auth/authOperations";

export default function ProfileScreen() {
  const { userId, login } = useSelector((state) => state.auth);

  const [userPosts, setUserPosts] = useState([]);
  const [photo, setPhoto] = useState(null);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const getUserPosts = async () => {
    const resp = await query(
      collection(db, "posts"),
      where("userId", "==", userId)
    );
    await onSnapshot(resp, (snapshot) => {
      setUserPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });
  };

  useEffect(() => {
    getUserPosts();
  }, []);

  let photoPath = "../../assets/images/photo.jpg";

  const addPhoto = async () => {
    setPhoto(photoPath);
  };
  const deletePhoto = () => {
    setPhoto(null);
  };

  const logOut = () => {
    console.log("Logout login", login);
    console.log("Logout email", email);
    dispatch(userLogOut());
    // navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={require("../../assets/images/bg-img.jpg")}
      >
        <View style={styles.formContainer}>
          <View style={styles.form}>
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
            <TouchableOpacity
              activeOpacity={0.3}
              style={{ position: "absolute", top: 20, right: 0 }}
              onPress={logOut}
            >
              <LogoutSvg />
            </TouchableOpacity>
            <View style={styles.header}>
              <Text style={styles.headerTitle}>{login}</Text>
            </View>
            <FlatList
              data={userPosts}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={styles.postContainer}>
                  <View
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
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
                    {/* {route.params.formState.title} */}
                  </Text>
                  <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity
                      activeOpacity={0.3}
                      onPress={() =>
                        navigation.navigate("Comments", { postId: item.id })
                      }
                      style={{ flexDirection: "row", gap: 6, marginRight: 24 }}
                    >
                      <MessageSvgActive />
                      <Text
                        style={{
                          fontFamily: "Roboto-Regular",
                          fontSize: 16,
                          color: "#212121",
                        }}
                      >
                        3
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      activeOpacity={0.3}
                      // onPress={}
                      style={{ flexDirection: "row", gap: 6 }}
                    >
                      <LikeSvg />
                      <Text
                        style={{
                          fontFamily: "Roboto-Regular",
                          fontSize: 16,
                          color: "#212121",
                        }}
                      >
                        5
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      activeOpacity={0.3}
                      onPress={() =>
                        navigation.navigate("Map", { location: item.location })
                      }
                      style={{
                        flexDirection: "row",
                        gap: 6,
                        marginLeft: "auto",
                      }}
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
                        {/* {route.params.formState.place} */}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
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
    position: "relative",
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#fff",
    marginTop: 147,
  },
  form: {
    marginHorizontal: 16,
    marginBottom: 43,
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
    marginTop: 32,
  },
  headerTitle: {
    fontSize: 30,
    color: "#212121",
    fontFamily: "Roboto-Medium",
  },
  postContainer: {
    marginTop: 32,
    flexDirection: "column",
    gap: 8,
  },
});

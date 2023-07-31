import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  FlatList,
} from "react-native";
import { useSelector } from "react-redux";
import {
  collection,
  addDoc,
  doc,
  onSnapshot,
  getCountFromServer,
} from "firebase/firestore";

import ArrowSvg from "../../assets/images/svg/ArrowSvg";
import { db } from "../../firebase/config";

export default function CommentsScreen({ route }) {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const [isFocused, setIsFocused] = useState(false);

  const { postId, photoUrl } = route.params;
  const { login } = useSelector((state) => state.auth);

  const keyboardClose = () => {
    setIsKeyboardOpen(false);
    Keyboard.dismiss();
  };

  const createComment = async () => {
    const postsCollection = await collection(db, "posts");
    const newPostRef = await doc(postsCollection, postId);
    const newCollection = await collection(newPostRef, "comments");

    await addDoc(newCollection, { comment, login });

    setComment("");
    Keyboard.dismiss();
  };

  const getAllComments = async () => {
    const postsCollection = await collection(db, "posts");
    const newPostRef = await doc(postsCollection, postId);
    const newCollection = await collection(newPostRef, "comments");
    const snapshot = await getCountFromServer(newCollection);

    const commentCounter = snapshot.data().count;
    // console.log("commentCounter: ", commentCounter);

    await onSnapshot(newCollection, (snapshot) => {
      setAllComments(snapshot.docs.map((doc) => doc.data()));
    });
    return commentCounter;
  };

  useEffect(() => {
    getAllComments();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={keyboardClose}>
      <View style={styles.container}>
        <View
          style={{
            alignItems: "center",
            marginTop: 32,
          }}
        >
          <Image
            source={{ uri: photoUrl }}
            style={{ height: 240, width: 358, borderRadius: 8 }}
          />
        </View>

        <SafeAreaView style={styles.commentContainer}>
          <FlatList
            data={allComments}
            renderItem={({ item }) => (
              <View style={{ flexDirection: "row", gap: 16, marginBottom: 24 }}>
                <Image
                  source={require("../../assets/images/photo.jpg")}
                  style={{ height: 28, width: 28, borderRadius: 50 }}
                />

                <Text style={styles.commentField}>{item.comment}</Text>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </SafeAreaView>

        <View>
          <View style={{ position: "relative", marginTop: 32 }}>
            <TextInput
              style={
                isFocused ? { ...styles.onFocusInput } : { ...styles.input }
              }
              placeholder={"Коментувати..."}
              placeholderTextColor={"#bdbdbd"}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              value={comment}
              onChangeText={setComment}
            />
            <TouchableOpacity
              activeOpacity={0.8}
              style={{
                position: "absolute",
                top: 0,
                right: 8,
                backgroundColor: "#ff6c00",
                width: 34,
                height: 34,
                borderRadius: 50,
                marginTop: 8,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={createComment}
            >
              <ArrowSvg />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    justifyContent: "flex-end",
  },
  commentContainer: {
    flex: 1,
    marginTop: 32,
  },
  commentField: {
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    width: 299,
    color: "#212121",
    fontFamily: "Roboto-Regular",
    fontSize: 13,
    borderRadius: 6,
    borderTopRightRadius: 0,
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#e8e8e8",
    height: 50,
    borderRadius: 100,
    backgroundColor: "#f6f6f6",
    color: "#212121",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    padding: 16,
    marginBottom: 16,
  },
  onFocusInput: {
    borderWidth: 1,
    height: 50,
    borderRadius: 100,
    color: "#212121",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    padding: 16,
    borderColor: "#ff6c00",
    backgroundColor: "#ffffff",
    marginBottom: 16,
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

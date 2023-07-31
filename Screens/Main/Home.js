import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

import PostsScreen from "./PostsScreen";
import ProfileScreen from "./ProfileScreen";
import CreatePostsScreen from "./CreatePostsScreen";
import PostsSvg from "../../assets/images/svg/PostsSvg";
import PlusSvg from "../../assets/images/svg/PlusSvg";
import ProfileSvg from "../../assets/images/svg/ProfileSvg";
import LogoutSvg from "../../assets/images/svg/LogoutSvg";
import { userLogOut } from "../../redux/auth/authOperations";

const MainTab = createBottomTabNavigator();

export default function Home({ route }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { login, email } = useSelector((state) => state.auth);

  const logOut = () => {
    console.log("Logout login", login);
    console.log("Logout email", email);
    dispatch(userLogOut());
    // navigation.navigate("Login");
  };

  return (
    <MainTab.Navigator
      initialRouteName="Posts"
      screenOptions={{
        tabBarShowLabel: false,
        headerTitleAlign: "center",

        // activeTintColor: "#ff6c00",
        // inactiveTintColor: "gray",
      }}
      // screenOptions={({ route }) => ({
      //  tabBarShowLabel: false,
      //   headerTitleAlign: "center",

      //     if (route.name === "Create") {
      //       tabBarStyle: { display: "none" }
      //     }
      //     return;
      // })}
    >
      <MainTab.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          title: "Публікації",
          headerStyle: {
            borderBottomWidth: 2,
            borderBottomColor: "#e8e8e8",
          },
          headerTintColor: "#212121",
          headerTitleStyle: {
            fontFamily: "Roboto-Medium",
            fontSize: 17,
            alignSelf: "center",
          },
          headerRight: () => (
            <TouchableOpacity
              activeOpacity={0.3}
              style={{ marginRight: 10 }}
              onPress={logOut}
            >
              <LogoutSvg />
            </TouchableOpacity>
          ),
          tabBarIcon: ({ focused, size, color }) => (
            <PostsSvg name="posts" size={size} color={color} />
          ),
        }}
      />
      <MainTab.Screen
        name="Create"
        component={CreatePostsScreen}
        options={{
          title: "Створити публікацію",
          headerStyle: {
            borderBottomWidth: 2,
            borderBottomColor: "#e8e8e8",
          },
          headerTintColor: "#212121",
          headerTitleStyle: {
            fontFamily: "Roboto-Medium",
            fontSize: 17,
            alignSelf: "center",
          },
          tabBarIcon: ({ focused, size, color }) => (
            <PlusSvg name="add" size={size} color={color} />
          ),
          tabBarIconStyle: {
            backgroundColor: "#ff6c00",
            width: 70,
            height: 40,
            borderRadius: 20,
            marginTop: 8,
          },
          tabBarHideOnKeyboard: true,
          tabBarStyle: { display: "none" },
        }}
      />
      <MainTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => (
            <ProfileSvg name="profile" size={size} color={color} />
          ),
        }}
      />
    </MainTab.Navigator>
  );
}

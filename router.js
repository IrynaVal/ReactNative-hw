import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TouchableOpacity } from "react-native";

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

import LogoutSvg from "./assets/images/svg/LogoutSvg";
import RegistrationScreen from "./Screens/auth/RegistrationScreen";
import LoginScreen from "./Screens/auth/LoginScreen";
import PostsScreen from "./Screens/main/PostsScreen";
import ProfileScreen from "./Screens/main/ProfileScreen";
import Home from "./Screens/main/Home";
import CreatePostsScreen from "./Screens/main/CreatePostsScreen";
import PostsSvg from "./assets/images/svg/PostsSvg";
import PlusSvg from "./assets/images/svg/PlusSvg";
import ProfileSvg from "./assets/images/svg/ProfileSvg";

export const chooseNavigation = (isAuth) => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator initialRouteName="Login">
        <AuthStack.Screen
          name="Registration"
          component={RegistrationScreen}
          options={{ headerShown: false }}
        />
        <AuthStack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <AuthStack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
      </AuthStack.Navigator>
    );
  }
  return (
    <Home />
    // <MainTab.Navigator
    //   initialRouteName="Home"
    //   screenOptions={{
    //     tabBarShowLabel: false,
    //     headerTitleAlign: "center",
    //   }}
    // >
    //   <MainTab.Screen
    //     name="Home"
    //     component={PostsScreen}
    //     options={{
    //       title: "Публікації",
    //       headerStyle: {
    //         borderBottomWidth: 2,
    //         borderBottomColor: "#e8e8e8",
    //       },
    //       headerTintColor: "#212121",
    //       headerTitleStyle: {
    //         fontFamily: "Roboto-Medium",
    //         fontSize: 17,
    //         alignSelf: "center",
    //       },
    //       headerRight: () => (
    //         <TouchableOpacity
    //           activeOpacity={0.3}
    //           style={{ marginRight: 10 }}
    //           // onPress={logOut}
    //           // onPress={() => navigation.navigate("Login")}
    //         >
    //           <LogoutSvg />
    //         </TouchableOpacity>
    //       ),
    //       tabBarIcon: ({ focused, size, color }) => (
    //         <PostsSvg name="posts" size={size} color={color} />
    //       ),
    //     }}
    //   />
    //   <MainTab.Screen
    //     name="Create"
    //     component={CreatePostsScreen}
    //     options={{
    //       title: "Створити публікацію",
    //       headerStyle: {
    //         borderBottomWidth: 2,
    //         borderBottomColor: "#e8e8e8",
    //       },
    //       headerTintColor: "#212121",
    //       headerTitleStyle: {
    //         fontFamily: "Roboto-Medium",
    //         fontSize: 17,
    //         alignSelf: "center",
    //       },
    //       tabBarIcon: ({ focused, size, color }) => (
    //         <PlusSvg name="add" size={size} color={color} />
    //       ),
    //       tabBarIconStyle: {
    //         backgroundColor: "#ff6c00",
    //         width: 70,
    //         height: 40,
    //         borderRadius: 20,
    //         marginTop: 8,
    //       },
    //     }}
    //   />
    //   <MainTab.Screen
    //     name="Profile"
    //     component={ProfileScreen}
    //     options={{
    //       headerShown: false,
    //       tabBarIcon: ({ focused, size, color }) => (
    //         <ProfileSvg name="profile" size={size} color={color} />
    //       ),
    //     }}
    //   />
    // </MainTab.Navigator>
  );
};

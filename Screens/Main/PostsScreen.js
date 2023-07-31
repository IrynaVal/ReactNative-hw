import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MapScreen from "../nestedScreens/MapScreen";
import CommentsScreen from "../nestedScreens/CommentsScreen";
import DefaultPostsScreen from "../nestedScreens/DefaultPostsScreen";

const NestedScreen = createStackNavigator();

export default function PostsScreen() {
  return (
    <NestedScreen.Navigator
      initialRouteName="DefaultScreen"
      screenOptions={{ tabBarStyle: { display: "none" } }}
    >
      <NestedScreen.Screen
        name="DefaultScreen"
        component={DefaultPostsScreen}
        options={{ headerShown: false }}
      />
      <NestedScreen.Screen
        name="Comments"
        component={CommentsScreen}
        options={{
          title: "Коментарі",
          headerStyle: {
            borderBottomWidth: 2,
            borderBottomColor: "#e8e8e8",
          },
          headerTintColor: "#212121",
          headerTitleStyle: {
            fontFamily: "Roboto-Medium",
            fontSize: 17,
            marginLeft: 82,
          },
          tabBarStyle: { display: "none" },
        }}
      />
      <NestedScreen.Screen
        name="Map"
        component={MapScreen}
        options={{
          title: "Карта",
          headerStyle: {
            borderBottomWidth: 2,
            borderBottomColor: "#e8e8e8",
          },
          headerTintColor: "#212121",
          headerTitleStyle: {
            fontFamily: "Roboto-Medium",
            fontSize: 17,
            marginLeft: 105,
          },
          // tabBarStyle: { display: "none" },
        }}
      />
    </NestedScreen.Navigator>
  );
}

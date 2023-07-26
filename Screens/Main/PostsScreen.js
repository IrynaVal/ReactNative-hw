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
      screenOptions={{ headerShown: false }}
    >
      <NestedScreen.Screen
        name="DefaultScreen"
        component={DefaultPostsScreen}
        // options={{ headerShown: false }}
      />
      <NestedScreen.Screen
        name="Comments"
        component={CommentsScreen}
        // options={{ headerShown: false }}
      />
      <NestedScreen.Screen
        name="Map"
        component={MapScreen}
        // options={{ headerShown: false }}
      />
    </NestedScreen.Navigator>
  );
}

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {} from "@reduxjs/toolkit";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// import { auth } from "../firebase/config";
import { chooseNavigation } from "../Router";
import RegistrationScreen from "../Screens/auth/RegistrationScreen";
import LoginScreen from "../Screens/auth/LoginScreen";
import Home from "../Screens/main/Home";
import { authStateChanged } from "../redux/auth/authOperations";

const AuthStack = createStackNavigator();

export default function Main() {
  //   const [user, setUser] = useState(null);

  const dispatch = useDispatch();

  const { stateChange } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(authStateChanged());
  }, []);

  const routing = chooseNavigation(stateChange);

  return (
    <NavigationContainer>
      {/* <AuthStack.Navigator initialRouteName="Login">
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
      </AuthStack.Navigator> */}
      {routing}
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

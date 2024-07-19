import React from "react";
import {
  View,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Post from "./Post";
import Stories from "./Stories";

const TopHomeBar = () => {
  const Tab = createMaterialTopTabNavigator();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
      

          <View style={{ flex: 1 }}>
            <Tab.Navigator
              initialRouteName="Home"
              screenOptions={{
                tabBarActiveTintColor: "rgba(0, 0, 0, 1)",
                tabBarLabelStyle: { fontSize: 16 },
                tabBarIndicatorStyle: {
                  backgroundColor: "#FF807D",
                },
                tabBarAndroidRipple: {
                  radius: 100,
                },
                tabBarStyle: { backgroundColor: "transparent" },
                tabBarInactiveTintColor: "rgba(0, 0, 0, 0.5)",
              }}
            >
              <Tab.Screen name="Home" component={Post} />
              <Tab.Screen name="forYou" component={Stories} />
            </Tab.Navigator>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};



export default TopHomeBar;

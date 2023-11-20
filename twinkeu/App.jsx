
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import StackScreen from "./components/StackScreen";
import { StatusBar } from "react-native";
// import BottomTab from "./components/BottomTab";

export default function App() {
  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <NavigationContainer>
        {/* <StackScreen /> */}
        <StackScreen />
      </NavigationContainer>
    </>

  );
}


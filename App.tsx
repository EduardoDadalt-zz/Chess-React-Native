import { StatusBar } from "expo-status-bar";
import React from "react";
import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import Chess from "./src/Chess";
import { SvgFromXml } from "react-native-svg";
export default function App() {
  return (
    <View style={styles.container}>
      <Chess />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
});

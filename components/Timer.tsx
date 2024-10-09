import {
  CircleDashed,
  CircleDot,
  PauseIcon,
  Play,
  PlayIcon,
} from "lucide-react-native";
import React, { useState } from "react";
import {
  StyleSheet,
  Button,
  View,
  SafeAreaView,
  Text,
  Alert,
  Pressable,
} from "react-native";

export function Timer() {
  return (
    <View style={styles.circleDot}>
      <Text style={styles.TextTimer}>25:00</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  circleDot: {
    borderWidth: 2,
    borderStyle: "dashed",
    borderRadius: 200,
    width: 250,
    height: 250,
    backgroundColor: "white",
    marginBottom: 50,
  },
  TextTimer: { fontSize: 50, marginTop: 90, marginLeft: 65 },
});
